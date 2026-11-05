import { useCallback, useEffect, useRef, useState } from 'react';

export interface DeckItem {
	src: string;
	alt: string;
	title: string;
	href: string;
}

const AUTOPLAY_MS = 3800;
const SWIPE_PX = 70; // how far to drag before the card moves to the back
const VISIBLE = 4; // cards drawn behind the front card

const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * A stacked deck of portrait photo cards. Plays on its own, pauses on hover or focus,
 * and can be dragged/swiped (or moved with the arrow keys) to the next card.
 */
export default function StackedGallery({ items }: { items: DeckItem[] }) {
	const n = items.length;
	const [index, setIndex] = useState(0);
	const [dragX, setDragX] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [paused, setPaused] = useState(false);
	const [still, setStill] = useState(false);
	const start = useRef<{ x: number; moved: boolean } | null>(null);
	const suppressClick = useRef(0);
	// the card that just left the front: it slides out first, then rejoins the back of the stack
	const [leaving, setLeaving] = useState<{ i: number; dir: number } | null>(null);
	const leaveTimer = useRef<number | undefined>(undefined);

	const indexRef = useRef(0);
	const go = useCallback(
		(step: number) => {
			const from = indexRef.current;
			indexRef.current = mod(from + step, n);
			setLeaving({ i: from, dir: step > 0 ? -1 : 1 });
			setIndex(indexRef.current);
			window.clearTimeout(leaveTimer.current);
			leaveTimer.current = window.setTimeout(() => setLeaving(null), 420);
		},
		[n],
	);
	useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		setStill(mq.matches);
	}, []);

	useEffect(() => {
		if (paused || still || dragging || n < 2) return;
		const id = window.setInterval(() => {
			if (!document.hidden) go(1);
		}, AUTOPLAY_MS);
		return () => window.clearInterval(id);
	}, [paused, still, dragging, go, n]);

	const onPointerDown = (e: React.PointerEvent) => {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		start.current = { x: e.clientX, moved: false };
	};
	const onPointerMove = (e: React.PointerEvent) => {
		const s = start.current;
		if (!s) return;
		const dx = e.clientX - s.x;
		if (!s.moved && Math.abs(dx) > 6) {
			s.moved = true;
			setDragging(true);
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		}
		if (s.moved) setDragX(dx);
	};
	const endDrag = () => {
		const s = start.current;
		start.current = null;
		if (!s?.moved) return;
		suppressClick.current = performance.now() + 300;
		if (Math.abs(dragX) > SWIPE_PX) go(dragX < 0 ? 1 : -1);
		setDragX(0);
		setDragging(false);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			go(1);
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			go(-1);
		}
	};

	if (n === 0) return null;
	const current = items[index];

	return (
		<div
			className="deck"
			role="region"
			aria-roledescription="carousel"
			aria-label="Photos from the field"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onBlur={() => setPaused(false)}
			onKeyDown={onKeyDown}
		>
			<div
				className="deck-stage"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onClickCapture={(e) => {
					if (performance.now() < suppressClick.current) {
						e.preventDefault();
						e.stopPropagation();
					}
				}}
			>
				{items.map((item, i) => {
					const offset = mod(i - index, n);
					const front = offset === 0;
					const isLeaving = leaving?.i === i && !front;
					const hidden = offset > VISIBLE;
					const dx = front ? dragX : 0;
					const style: React.CSSProperties = isLeaving
						? {
								// slide out in the swipe direction and fade, above the rest of the stack
								zIndex: n + 1,
								opacity: 0,
								transform: `translateX(${leaving!.dir * 45}%) rotate(${leaving!.dir * 8}deg) scale(0.92)`,
								transition: 'transform 0.42s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease-in',
							}
						: {
								zIndex: n - offset,
								opacity: hidden ? 0 : 1,
								transform: front
									? `translateX(${dx}px) rotate(${dx / 18}deg)`
									: `translateX(${offset * 7}%) translateY(${offset * 1.5}%) rotate(${offset * 3.5}deg) scale(${1 - offset * 0.06})`,
								filter: front ? 'none' : `grayscale(${Math.min(1, 0.55 + offset * 0.15)}) brightness(${1 - offset * 0.08})`,
								transition: front && dragging ? 'none' : undefined,
							};
					return (
						<a
							key={item.src}
							href={item.href}
							className="deck-card"
							style={style}
							tabIndex={front ? 0 : -1}
							aria-hidden={!front}
							draggable={false}
							aria-label={`${item.title}: read the story`}
						>
							<img src={item.src} alt={item.alt} draggable={false} loading={offset < 2 ? 'eager' : 'lazy'} />
						</a>
					);
				})}
			</div>

			<div className="deck-caption">
				<p className="deck-title" key={index} aria-live="polite">
					{current.title}
				</p>
				<div className="deck-nav">
					<button type="button" onClick={() => go(-1)} aria-label="Previous photo">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" />
						</svg>
					</button>
					<span className="deck-count" aria-hidden="true">
						<span key={index} className="deck-count-now">
							{String(index + 1).padStart(2, '0')}
						</span>
						<span className="deck-count-total"> / {String(n).padStart(2, '0')}</span>
					</span>
					<button type="button" onClick={() => go(1)} aria-label="Next photo">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

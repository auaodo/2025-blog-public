import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { styles as hiCardStyles } from './hi-card'
import { CARD_SPACING } from '@/consts'
import { styles as clockCardStyles } from './clock-card'
import { styles as calendarCardStyles } from './calendar-card'

export const styles = {
	width: 293,
	height: 140,
	offset: 120,
	order: 6
}

export default function MusicCard() {
	const center = useCenterStore()

	return (
		<Card
			order={styles.order}
			width={styles.width}
			height={styles.height}
			x={center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset}
			y={center.y - clockCardStyles.offset + CARD_SPACING + calendarCardStyles.height + CARD_SPACING}
			className='overflow-hidden p-0'>
			<iframe
				src="//player.bilibili.com/player.html?bvid=BV11jkvB2EhV&page=1&high_quality=1&danmaku=0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
				width="100%"
				height="100%"
				scrolling="no"
				frameBorder="0"
				sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
			/>
		</Card>
	)
}

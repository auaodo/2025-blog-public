import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { styles as hiCardStyles } from './hi-card'
x = { center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset }
y = { center.y - clockCardStyles.offset + CARD_SPACING + calendarCardStyles.height + CARD_SPACING }
className = 'flex items-center gap-3' >
			<MusicSVG className='h-8 w-8' />

			<div className='flex-1'>
				<div className='text-secondary text-sm'>随机音乐</div>

				<div className='mt-1 h-2 rounded-full bg-white/60'>
					<div className='bg-linear h-full w-1/2 rounded-full' />
				</div>
			</div>

			<button className='flex h-10 w-10 items-center justify-center rounded-full bg-white'>
				<PlaySVG className='text-brand ml-1 h-4 w-4' />
			</button>
		</Card >
	)
}

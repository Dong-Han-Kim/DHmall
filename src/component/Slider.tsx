import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { items } from '../assets/slide';
import * as style from './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';

export function Slider() {
	const swiperElRef = useRef(null);
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay, A11y]}
			ref={swiperElRef}
			loop={true}
			slidesPerView={1}
			navigation={true}
			pagination={true}
			spaceBetween={50}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}>
			{items.map((item) => {
				return (
					<SwiperSlide>
						<img src={item.image} alt={item.id} className={style.slide} />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}

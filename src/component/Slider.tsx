import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { items } from '../assets/slide';
import * as style from './styles/Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export function Slider() {
	const swiperElRef = useRef(null);
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay, A11y]}
			ref={swiperElRef}
			loop={true}
			slidesPerView={1}
			navigation={false}
			pagination={true}
			spaceBetween={50}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}>
			{items.map((item) => {
				return (
					<SwiperSlide key={item.id}>
						<img src={item.image} alt={item.id} className={style.slide} />
						<Link to={item.Link} className={style.slideBtnBox}>
							<button className={style.slideBtn}>{item.name}</button>
						</Link>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}

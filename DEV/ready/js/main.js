$(document).ready(function() {

    // ===== Длобавление class BODY при загрузке страницы
	$('body').addClass('_load');

	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
		$("body").addClass("mac");
	} else {
		$("body").addClass("pc");
	}

	// === Burger menu
	$(document).on('click', '.burger', function () {
		$(this).toggleClass('active');
		$('.burger-content').slideToggle();
	});

	// sliders
	const docsSlider = new Swiper('.docs__slider', {
		slidesPerView: 1,
		spaceBetween: 24,
		pagination: {
			el: '.docs .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
		}
	})

	const eqphotosSlider = new Swiper('.eqphotos__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.eqphotos .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		}
	})

	const videosSlider = new Swiper('.videos__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.videos .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		}
	});

	const eqitemSlider = new Swiper('.eqitem__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.eqitem .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
		}
	});

	const advsSlider = new Swiper('.advs__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.advs .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
		}
	});

	const photosSlider = new Swiper('.photos__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.photos .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
		}
	});

	// hover: active slide scales up, neighbors shrink in width, gaps stay fixed
	const SCALE = 1.1;
	const GAP = 12;
	const sliderEl = document.querySelector('.videos__slider');
	let currentActive = null;

	function getSlidesPerView() {
		const w = window.innerWidth;
		if (w >= 1200) return 4;
		if (w >= 768) return 3;
		if (w >= 480) return 2;
		return 1;
	}

	function getVisibleSlides() {
		const n = getSlidesPerView();
		const start = videosSlider.activeIndex;
		return Array.from(videosSlider.slides).slice(start, start + n);
	}

	function applyHover(activeSlide) {
		const visible = getVisibleSlides();
		const n = visible.length;
		if (n <= 1) return;
		const totalWidth = sliderEl.offsetWidth;
		const baseWidth = (totalWidth - GAP * (n - 1)) / n;
		const activeWidth = baseWidth * SCALE;
		const neighborWidth = (totalWidth - GAP * (n - 1) - activeWidth) / (n - 1);

		visible.forEach(slide => {
			if (slide === activeSlide) {
				slide.style.setProperty('width', activeWidth + 'px', 'important');
				slide.classList.add('_hovered');
			} else {
				slide.style.setProperty('width', neighborWidth + 'px', 'important');
				slide.classList.remove('_hovered');
			}
		});
	}

	function resetHover() {
		const visible = getVisibleSlides();
		const n = visible.length;
		const totalWidth = sliderEl.offsetWidth;
		const baseWidth = (totalWidth - GAP * (n - 1)) / n;
		visible.forEach(slide => {
			slide.style.setProperty('width', baseWidth + 'px', 'important');
			slide.classList.remove('_hovered');
		});
	}

	// фиксируем высоту слайдера до первого hover чтобы не скакал
	let heightFixed = false;

	sliderEl.addEventListener('mouseover', (e) => {
		const slide = e.target.closest('.swiper-slide');
		if (!slide) return;

		if (!heightFixed) {
			sliderEl.style.height = sliderEl.offsetHeight + 'px';
			heightFixed = true;
		}

		if (slide === currentActive) return;
		currentActive = slide;
		applyHover(currentActive);
	});

	sliderEl.addEventListener('mouseleave', () => {
		currentActive = null;
		resetHover();
	});

	window.addEventListener('resize', () => {
		currentActive = null;
		resetHover();
	});

});

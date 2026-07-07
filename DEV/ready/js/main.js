$(document).ready(function() {

    // ===== Длобавление class BODY при загрузке страницы
	$('body').addClass('_load');

	if (navigator.userAgent.indexOf('Mac OS X') != -1) {
		$("body").addClass("mac");
	} else {
		$("body").addClass("pc");
	}

	// === Burger menu
	$(document).on('click', '.header__burger', function () {
		$(this).toggleClass('active');
		$('.header--green').toggleClass('active');
		$('.burger-content').slideToggle();
	});

	// === Eye desktop follows cursor
	const $header = $('.header');
	const $eyeDesktop = $('.header__eye--desktop');
	const $eyeSmallImg = $eyeDesktop.find('.header__eye-small img');
	const eyeMinX = -9;
	const eyeMaxX = 7;

	$header.on('mousemove', function (e) {
		if (!$eyeDesktop.length) return;

		const eyeRect = $eyeDesktop[0].getBoundingClientRect();
		const eyeCenterX = eyeRect.left + eyeRect.width / 2;
		const halfWindowWidth = $(window).width() / 2;
		const ratio = (e.clientX - eyeCenterX) / halfWindowWidth;
		const clampedRatio = Math.max(-1, Math.min(1, ratio));
		const x = clampedRatio > 0
			? clampedRatio * eyeMaxX
			: clampedRatio * Math.abs(eyeMinX);

		$eyeSmallImg.css('transform', `translateX(${x}px)`);
	});

	$header.on('mouseleave', function () {
		$eyeSmallImg.css('transform', 'translateX(0px)');
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

	const techSlider = new Swiper('.tech__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.tech .swiper-pagination',
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
			1200: {
				slidesPerView: 4,
			},
		}
	});

	const homeeqSlider = new Swiper('.homeeq__slider', {
		slidesPerView: 1,
		spaceBetween: 12,
		pagination: {
			el: '.homeeq .swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.homeeq__arrow--next',
			prevEl: '.homeeq__arrow--prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 2.3,
			},
		}
	});

	// hover: active slide scales up, neighbors shrink in width, gaps stay fixed
	function initHoverScale(sliderInstance, sliderSelector, breakpointsMap, options) {
		const SCALE = (options && options.scale) || 1.1;
		const freezeHeight = !(options && options.freezeHeight === false);
		const sliderEl = document.querySelector(sliderSelector);
		if (!sliderEl) return;
		let currentActive = null;

		// реальное (возможно дробное) кол-во слайдов на экране берём у самого Swiper,
		// а не пересчитываем по breakpointsMap — так работает и slidesPerView: 2.3
		function getSlidesPerView() {
			const spv = sliderInstance.params && sliderInstance.params.slidesPerView;
			if (typeof spv === 'number') return spv;
			const w = window.innerWidth;
			let result = 1;
			Object.keys(breakpointsMap).map(Number).sort((a, b) => a - b).forEach(bp => {
				if (w >= bp) result = breakpointsMap[bp];
			});
			return result;
		}

		function getVisibleSlides() {
			const n = Math.ceil(getSlidesPerView());
			const start = sliderInstance.activeIndex;
			return Array.from(sliderInstance.slides).slice(start, start + n);
		}

		// базовая ширина слайда фиксируется один раз (пока ни один слайд ещё не
		// тронут inline-стилями), иначе повторные hover/leave читали бы уже
		// суженный DOM-размер и слайды сжимались бы с каждым разом всё сильнее
		let baseWidth = null;

		function captureBaseWidth() {
			const visible = getVisibleSlides();
			const untouched = visible.find(slide => !slide.style.width);
			baseWidth = (untouched || visible[0]).getBoundingClientRect().width;
		}

		function applyHover(activeSlide) {
			const visible = getVisibleSlides();
			const n = visible.length;
			if (n <= 1) return;
			if (baseWidth === null) captureBaseWidth();
			const activeWidth = baseWidth * SCALE;
			const extra = activeWidth - baseWidth;
			const neighborWidth = baseWidth - extra / (n - 1);

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
			if (baseWidth === null) return;
			visible.forEach(slide => {
				slide.style.setProperty('width', baseWidth + 'px', 'important');
				slide.classList.remove('_hovered');
			});
		}

		// снимает inline-ширину со всех слайдов и заставляет пересчитать
		// baseWidth заново из CSS-раскладки (нужно при ресайзе окна)
		function clearWidths() {
			Array.from(sliderInstance.slides).forEach(slide => {
				slide.style.removeProperty('width');
				slide.classList.remove('_hovered');
			});
			baseWidth = null;
		}

		// фиксируем высоту слайдера до первого hover чтобы не скакал
		let heightFixed = false;

		sliderEl.addEventListener('mouseover', (e) => {
			const slide = e.target.closest('.swiper-slide');
			if (!slide) return;

			if (freezeHeight && !heightFixed) {
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
			clearWidths();
		});
	}

	initHoverScale(videosSlider, '.videos__slider', { 0: 1, 480: 2, 768: 3, 1200: 4 });
	initHoverScale(techSlider, '.tech__slider', { 0: 1, 480: 2, 992: 4 });
	initHoverScale(homeeqSlider, '.homeeq__slider', { 0: 1, 480: 2, 1200: 2.3 }, { scale: 1.04 });

	// === Скролл наверх страницы
	$(document).on('click', '.footer__bottom-btn a', function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 600);
	});

	$('.header__search input').on('input', function() {
		$(this).parent().toggleClass('active', $(this).val() !== '');
	});

	// === Анимации появления секций при скролле + герой при загрузке
	if (window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		gsap.registerPlugin(ScrollTrigger);

		const heroItems = document.querySelectorAll('.reveal-hero-item');
		if (heroItems.length) {
			gsap.to(heroItems, {
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: 'power2.out',
				stagger: 0.15,
				delay: 0.2
			});
		}

		document.querySelectorAll('.reveal').forEach(function (section) {
			const items = section.querySelectorAll('.reveal-item');

			gsap.to(section, {
				opacity: 1,
				y: 0,
				duration: 1,
				delay: 0.15,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					once: true
				}
			});

			if (items.length) {
				gsap.to(items, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					delay: 0.15,
					ease: 'power2.out',
					stagger: 0.18,
					scrollTrigger: {
						trigger: section,
						start: 'top 80%',
						once: true
					}
				});
			}
		});
	}

});

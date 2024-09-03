gsap.registerPlugin(Flip, ScrollToPlugin, EaselPlugin);

const preloaderBackground = document.querySelector('.preloader__background');
const preloaderText = document.querySelector('.preloader__text span');
const heroTitles = [...document.querySelectorAll('.hero__title span span')];
const heroImageStart = document.querySelector('.hero__image__start');
const heroCaption = document.querySelector('.hero__caption span');
const heroButton = document.querySelector('.hero__button');
const heroImageWrapper = document.querySelector('.hero__image');
const heroImage = document.querySelector('.hero__image img');
const headerItems = [...document.querySelectorAll('.header *')];


const master = gsap.timeline();



const setInitialStates = () => {

    gsap.set(headerItems, {
        y: 24,
        autoAlpha: 0
    });

    gsap.set(heroButton, {
        y: 64,
        autoAlpha: 0
    });

    gsap.set([preloaderText, heroTitles, heroCaption], {
        yPercent: 100
    });

}

const preloaderAnimation = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: 'power2.out'
        }
    });

    tl.to(preloaderText, {
        yPercent: 0,
        delay: .3
    })
        .to(preloaderText, {
            yPercent: -105,
            delay: 1
        })

        .to(preloaderBackground, {
            yPercent: -100,
            duration: 1.5,
            ease: 'power4.inOut'
        }, '<')


    return tl;
}
    
const heroImageAnimation = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: 'power3.inOut',
            duration: 2
        }
    });

    // Capture the current state
    const state = Flip.getState(heroImageWrapper);
    
    // Apply changes to trigger the animation (e.g., you might want to move or resize the wrapper)
    // Here we should apply some change to the element (like adding a class that modifies its layout)
    heroImageStart.appendChild(heroImageWrapper)

    tl.from(heroImage, {
        scale: 1.1
    })
    .to(heroImageWrapper, {
        borderRadius: '16px'
    }, '<')

    // Flip animation
        .add(() => {
            Flip.to(state, {
                duration: 2,
                ease: 'power3.inOut'
        })
    }, '<')

    return tl;
}

const uiAnimation = () => {
    const tl = gsap.timeline({
        delay: .5,
        defaults: {
            ease: 'power3.out',
            duration: 1.7,
            yPercent: 0,
            y: 0
        }
    });
    tl.to(heroCaption, {
        duration: 1.2,
        ease: 'power2.inOut'
    })
        .to(heroTitles, {
            stagger: .2
        }, '-=0.9')
        .to(heroButton, {
        autoAlpha: 1
        }, 0.5)
        .to(headerItems, {
        autoAlpha: 1
    }, 0.5)


    return tl;
}


master
    .add(setInitialStates())
    .add(preloaderAnimation())
    .add(heroImageAnimation(), '-=1,5')
    .add(uiAnimation(), '<')
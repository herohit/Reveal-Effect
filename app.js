function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

loco();


// gsap

var tl = gsap.timeline({
    scrollTrigger:{
        trigger:`.part-1`,
        start:`50% 50%`,
        end:`150% 50%`,
        // markers:true,
        pin:true,
        scrub:2,
        scroller:`#main`
    }
})


tl.to(`.top-content`,{
    rotateX:`100deg`,
    opacity:0,
    duration:1,
},'a')
.to(`.bottom-content`,{
    rotateX:`-110deg`,
    opacity:0,
    duration:1,
},'a')

.to('.img',{
    width:`100%`,
    height:`100%`,
    duration:5,
},'a')
.to('.middle',{
    duration:2,
    opacity:1,
    y:`-250`,
    delay:5,
},'a')


gsap.to(`.part-2 h1`,{
    opacity:1,
    ease:Power3. easeOut,
    y: '-150 ',
    scrollTrigger:{
        trigger:`.part-2 h1`,
        start:'bottom 90%',
        end:'bottom 70%',
        scroller:`#main`,
        scrub:2,
    }
})
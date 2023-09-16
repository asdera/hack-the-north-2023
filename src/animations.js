// animation scale in and out
export const scaleAnimation = {
    initial: {
        scale: 0.5
    },
    enter: {
        scale: 1.1, 
        transition: {
            duration: 0.35,
            ease: "easeInOut"
        }
    },
    exit: {
        scale: 0.65, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    final: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.15,
            ease: "easeInOut"
        }
    },
}

// animation fade in and out
export const fadeAnimation = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        opacity: 0, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
}

// animation enter and exit from the top
export const topAnimation = {
    initial: {
        y: '-250%'
    },
    enter: {
        y: 0, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        y: '-100%', 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
}

// animation enter and exit from the bottom
export const bottomAnimation = {
    initial: {
        y: '150%'
    },
    enter: {
        y: 0, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        y: '150%', 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
}

// animation enter and exit from the bottom
export const leftAnimation = {
    initial: {
        x: '-150%'
    },
    enter: {
        x: 0, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        x: '-150%', 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
}

// animation enter and exit from the bottom
export const rightAnimation = {
    initial: {
        x: '150%'
    },
    enter: {
        x: 0, 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    exit: {
        x: '150%', 
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
}

export default fadeAnimation
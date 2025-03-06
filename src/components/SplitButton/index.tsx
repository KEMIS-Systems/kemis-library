import React, { RefObject, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

// Icons
import { BsThreeDotsVertical } from "react-icons/bs";

// Types
import { ISplitButtonProps } from "./types";

/**
 * 
 * 
 * @param buttonName {String} - The unique name to button
 * @param dropListItems  {Element} - Some element, not is necessary a div or ul, just a <></> (Fragment) and your elements items
 * @param dropListClassName {String} - Tailwind class of your prefer
 * @param buttonLabelClassName {String} - Tailwind class of your prefer
 * @param dropListIcon {Element} - Some element to apply a exclusive icon
 * @returns 
 */
export function SplitButton (props: ISplitButtonProps) {

    // AUX Variable
    const SPLIT_BUTTON_ELEMENT_REF = useRef<any>(null) as RefObject<HTMLButtonElement>
    const SPLIT_LIST_ELEMENT_REF = useRef<any>(null) as RefObject<HTMLUListElement>

    const handleSetDropListPosition = useCallback((event: UIEvent | null = null) => {
        try {
            // if(!event) throw new Error('The UIEvent is not valid event');

            if(!SPLIT_LIST_ELEMENT_REF?.current || !SPLIT_BUTTON_ELEMENT_REF?.current) throw new Error('Some essential elements ref is no available');

            const VIEWPORT_WIDTH = event?.view?.innerWidth || window.innerWidth || 0
            const VIEWPORT_HEIGHT = event?.view?.innerHeight || window.innerHeight || 0

            const RECT_LIST = SPLIT_LIST_ELEMENT_REF.current.getBoundingClientRect()
            const RECT_BUTTON = SPLIT_BUTTON_ELEMENT_REF.current.getBoundingClientRect()

            const RECT_BUTTON_LEFT = RECT_BUTTON.right
            const RECT_BUTTON_RIGHT = VIEWPORT_WIDTH - RECT_BUTTON.right

            if(VIEWPORT_WIDTH <= 0 || VIEWPORT_HEIGHT <= 0) throw new Error('The window dimension is not valid');

            if(RECT_BUTTON_LEFT >= (RECT_LIST.width / 2) && (RECT_BUTTON_LEFT >= RECT_LIST.width || (RECT_BUTTON_LEFT + RECT_LIST.width) <= VIEWPORT_WIDTH) && VIEWPORT_WIDTH >= RECT_LIST.width) {
                SPLIT_LIST_ELEMENT_REF.current.dataset['onleft'] = 'true'
                SPLIT_LIST_ELEMENT_REF.current.dataset['onright'] = 'false'
                console.log('SPLIT_LIST_ELEMENT_REF on onLeft')
            }

            if(RECT_BUTTON_RIGHT >= (RECT_LIST.width / 2) && (RECT_BUTTON_RIGHT >= RECT_LIST.width || (RECT_BUTTON_RIGHT + RECT_LIST.width) <= VIEWPORT_WIDTH) && VIEWPORT_WIDTH >= RECT_LIST.width) {
                SPLIT_LIST_ELEMENT_REF.current.dataset['onright'] = 'true'
                SPLIT_LIST_ELEMENT_REF.current.dataset['onleft'] = 'false'
                console.log('SPLIT_LIST_ELEMENT_REF on onRight')
            }

            if(RECT_BUTTON.top >= RECT_LIST.height && VIEWPORT_HEIGHT >= RECT_LIST.height) {
                SPLIT_LIST_ELEMENT_REF.current.dataset['ontop'] = 'true'
                SPLIT_LIST_ELEMENT_REF.current.dataset['onbottom'] = 'false'
                console.log('SPLIT_LIST_ELEMENT_REF on onTop')
            }

            if(RECT_BUTTON.bottom >= RECT_LIST.height && VIEWPORT_HEIGHT >= RECT_LIST.height) {
                SPLIT_LIST_ELEMENT_REF.current.dataset['onbottom'] = 'true'
                SPLIT_LIST_ELEMENT_REF.current.dataset['ontop'] = 'false'
                console.log('SPLIT_LIST_ELEMENT_REF on onBottom')
            }

            console.table({
                event,
                VIEWPORT_WIDTH,
                VIEWPORT_HEIGHT,
                RECT_BUTTON_LEFT,
                RECT_BUTTON_RIGHT,
                RECT_LIST,
                RECT_BUTTON,
                SPLIT_LIST_ELEMENT_REF,
                SPLIT_BUTTON_ELEMENT_REF
            })

        } catch (error) {
            console.log(error)
        }
    }, [SPLIT_BUTTON_ELEMENT_REF,SPLIT_LIST_ELEMENT_REF])

    useEffect(() => {
        if(!document || !window) return;        
        
        window.addEventListener('resize', handleSetDropListPosition)

        return () => {
            window.removeEventListener('resize', handleSetDropListPosition)
        }
    },[])

    useEffect(() => {
        handleSetDropListPosition()
    },[])

    return (
        <>
            <input type="checkbox" name={props.buttonName || ''} id={props.buttonName || ''} className="peer/DropList hidden" />
            <button 
                ref={SPLIT_BUTTON_ELEMENT_REF}
                type="button" 
                className={
                    twMerge(
                        `
                                w-[133.48px] 
                                h-[40px] 
                                p-0
                                rounded-lg 
                                border-[1px] 
                                border-gray-300 bg-gray-200 
                                flex flex-row-reverse
                                flex-nowrap 
                                items-center justify-between 
                                gap-4
                                relative
                                peer-checked/DropList:[&_ul]:opacity-100
                                peer-checked/DropList:[&_ul]:pointer-events-auto
                                peer-checked/DropList:[&_ul]:cursor-default
                                peer-checked/DropList:[&_ul]:z-50
                            `,
                        props.className
                    )
                }
            >
                {props.children}

                <label 
                    htmlFor={props.buttonName || ''}
                    className={twMerge(
                        `
                            flex-1 
                            min-w-[30%]
                            max-w-[30%]
                            h-full
                            rounded-tr-lg
                            rounded-br-lg
                            flex flex-row 
                            items-center justify-center
                            bg-gray-300
                            hover:bg-gray-400
                            hover:active:bg-gray-500
                            active:bg-gray-400

                            cursor-pointer
                        `,
                        props.buttonLabelClassName
                    )}
                >
                    {
                        props.dropListIcon || ( <BsThreeDotsVertical size={24} />)
                    }
                </label>

                <ul
                    ref={SPLIT_LIST_ELEMENT_REF}
                    data-onleft={false}
                    data-ontop={false}
                    data-onright={false}
                    data-onbottom={false}
                    className={
                        twMerge(
                            `
                                spl-btn-droplist
                                min-w-[175px]
                                w-[max-content]
                                min-h-[35px] 
                                max-h-[235px]
                                overflow-y-auto
                                h-auto
                                rounded-lg
                                bg-white 
                                border-[1px]
                                border-gray-300
                                shadow-md
                                p-2
                                flex
                                flex-col
                                gap-4
                                absolute
                                opacity-0
                                pointer-events-none
                                transition-all
                                duration-[0.15s]
                                z-[-1]
                                right-0
                                top-[40px]

                                data-[onleft=false]:data-[onright=true]:-right-[100%]
                                data-[onright=false]:data-[onleft=true]:-left-[100%]
                                
                                data-[onbottom=false]:data-[ontop=true]:-top-[44px]
                                data-[ontop=false]:data-[onbottom=true]:top-[43px]

                                
                            `,
                            props.dropListClassName || ''
                        )
                    }       
                >
                    {props.dropListItems}
                </ul>
            </button>
        </>
    )
}


/**a
 * 
 * data-[onbottom=false]:data-[ontop=true]:data-[onright=false]:data-[onleft=true]:left-0
                                data-[onbottom=false]:data-[ontop=true]:data-[onright=false]:data-[onleft=false]:right-0
                                data-[onbottom=false]:data-[ontop=true]:data-[onleft=false]:data-[onright=true]:right-0

                                data-[ontop=false]:data-[onbottom=true]:data-[onright=false]:data-[onleft=true]:left-0
                                data-[ontop=false]:data-[onbottom=true]:data-[onright=false]:data-[onleft=false]:right-0
                                data-[ontop=false]:data-[onbottom=true]:data-[onleft=false]:data-[onright=true]:right-0

                                data-[onleft=false]:data-[onright=false]:data-[onbottom=true]:data-[ontop=true]:-bottom-[48px]
                                data-[onleft=false]:data-[onright=false]:data-[onbottom=true]:data-[ontop=true]:-right-1/2
                                data-[onleft=false]:data-[onright=false]:data-[onbottom=true]:data-[ontop=true]:-translate-x-1/2
 */
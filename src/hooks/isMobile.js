import {useEffect, useState} from 'react'

const useIsMobile = (width) => {
    const [mobile, setMobile] = useState(window.matchMedia('(max-width: ' + width + ')').matches)

    useEffect(() => {
        function updateView() {
            if (window.matchMedia('(max-width: ' + width + ')').matches) {
                setMobile(true)
            } else {
                setMobile(false)
            }
        }

        window.addEventListener('resize', updateView)
        updateView()
        return () => window.removeEventListener('resize', updateView)
    })

    return {mobile}
}

export default useIsMobile
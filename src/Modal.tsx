import { MouseEventHandler, ReactElement } from "react"

function Modal ({handleClose, show, children}: {handleClose: MouseEventHandler, show: Boolean, children: ReactElement}) {
    const showClassName = show ? "Modal-block" : "Modal-none"

    return (
        <div className={showClassName}>
            <div>
                <span className="Modal-closeIcon" onClick={handleClose}>x</span>
                {children}
            </div>
        </div>
    )
}

export default Modal
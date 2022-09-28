import { useState, forwardRef ,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
    const [ visable, setVisable] = useState(false)

    const hide = { display: visable ? 'none' : '' }
    const show = { display: visable ? '' : 'none' }

    const toggleVisibility = () => setVisable(!visable)

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })
    return(
        <div>
            <div style={hide}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={show} className='togglableeContent'>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable
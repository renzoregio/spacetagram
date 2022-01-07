import { faForward, faBackward, faHeart, faRocket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const icons = {
    "next": <FontAwesomeIcon icon={faForward} />,
    "previous": <FontAwesomeIcon icon={faBackward}/>,
    "like": <FontAwesomeIcon icon={faHeart} />,
    "rocket": <FontAwesomeIcon icon={faRocket} />

}

export default icons;
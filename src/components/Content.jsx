/*
    path/root/src/components/Content.jsx
    Imports:
    ||
    \/
*/

import PropTypes from 'prop-types'
import Info from './Info'
import { BsQuestionLg, BsBoxArrowRight, BsBoxArrowUpRight } from 'react-icons/bs'


// Content function
function Content({ 
    greeting, 
    heading, 
    subject, 
    handleLogout, 
    handleLeaveQuiz, 
    info,
    handleInfoClick,
    handleOutsideClick,
    children 
}) {

    return (
        <>
            {
                info && (
                    <Info handleInfoClick={handleInfoClick} handleOutsideClick={handleOutsideClick} />
                )
            }
            <header>
                <h1><a href="/"><span className="theme-intruder">AmsR  </span>Quiz <span className="theme-intruder">H</span>ub</a></h1>
                <div></div>
              <ul>
                { 
                    handleLeaveQuiz ? 
                    <li title="Leave Quiz"><a onClick={handleLeaveQuiz}><BsBoxArrowUpRight size={25} /></a></li> 
                    : subject ? 
                    <li title={subject}>{subject}</li>
                    :
                    <>
                        <li title="Info"><a onClick={handleInfoClick}><BsQuestionLg size={25} /></a></li>
                        <li className="margin-left" title="Logout"><a onClick={handleLogout}><BsBoxArrowRight size={25} /></a></li>
                    </>
                }
              </ul>
            </header>
            <main>
                <div className="heading-container">
                    {greeting && greeting}
                    {heading && heading}
                </div>
                {children && children}
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()}, AmsR Quiz</p>
                <span>Made with ❤️ by 
                    <a target="_blank" rel="noopener noreferrer" href='https://amsrportfolio.netlify.app/'> Aryan Maurya</a>
                </span>
            </footer>
        </>
    )
}

Content.propTypes = {
    greeting: PropTypes.string,
    heading: PropTypes.string,
    subject: PropTypes.string,
    handleLogout: PropTypes.func,
    handleLeaveQuiz: PropTypes.func,
    info: PropTypes.bool,
    handleInfoClick: PropTypes.func,
    handleOutsideClick: PropTypes.func,
    children: PropTypes.node
}

export default Content
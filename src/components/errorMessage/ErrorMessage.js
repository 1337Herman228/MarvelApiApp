import img from './error.gif'

const ErrorMessage = ({newStyle}) => {
	return (
		<img
		style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto', ...newStyle}}
		 src={img} alt="error"/>
	)
}

export default ErrorMessage
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {useForm, SubmitHandler} from 'react-hook-form';

import './charSearchForm.scss';

const CharSearchForm = () => {

	const [char, setChar] = useState(null);

	const {loading, error, getCharacterByName, clearError} = useMarvelService();

	const {register, handleSubmit, formState: {errors}} = useForm();

	const onCharLoaded = (char) => {
        setChar(char);
    }

	const onSubmit = (data) => {
			// clearError();
			getCharacterByName(data.charName)
			.then(onCharLoaded)
			.catch(()=>{
				setChar([]);
			})
	}

	const errorMessage = error ? <ErrorMessage/> : null;
	const result = !char ? null : char.length != 0 ?
				<div className="char__search-wrapper">
					<div className="char__search-success">There is! Visit {char.name} page?</div>
					<Link to={`/char/${char.id}`} className="button button__secondary">
						<div className="inner">To page</div>
					</Link>
				</div> : 
				<div className="char__search-error">
					The character was not found. Check the name and try again
				</div>;

    return (
        <div className="char__search-form">
                <form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">

                        <input
							{...register('charName', {required: 'This field is required'})}
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>

                        <button 
							onClick={handleSubmit(onSubmit)}
                            type='submit'
                            className="button button__main"
                            disabled={loading}
							>
                            <div className="inner">find</div>
                        </button>
                    </div>
					<div className="char__search-error">{errors.charName?.message}</div>
                </form>
            {result}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;
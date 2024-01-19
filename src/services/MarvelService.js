

class MarvelService{

	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=df38e2d0fde2f079da985b6086ab7b96'

	getResource = async (url) => {
		let res = await fetch(url)
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}
		return await res.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
		return res.data.results.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`)
		return this._transformCharacter(res.data.results[0])
	}

	_transformCharacter =(char)=>{
		var description = char.description
		if(char.description===''){
			description='No description'
		}

		var tenFirstComics = char.comics.items.slice(0, 10)

		return{
			name:char.name,
            description:description,
            thumbnail:char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage:char.urls[0].url,
            wiki:char.urls[1].url,
			id:char.id,
			comics:tenFirstComics
		}
	}
}

export default MarvelService
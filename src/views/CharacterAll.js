import CharacterProvider from "../services/CharacterProvider"

export default class CharacterAll {
    async render(){
    let characters = await ArticleProvider.fetchCharacters();
    }
}
class StackOverflow {
    constructor(){
        this.questions = [];
        this.users = [];
    }

    addQuestion(question){
        this.questions.push(question);
    }

    removeQuestion(id){
        this.questions = this.questions.filter(question => question.getId() !== id);
    }

    getQuestions(){
        return this.questions;
    }

    addUser(user){
        this.users.add(user);
    }

    removeUser(id){
        this.users = this.users.filter(user => user.getId() !== id);
    }

    getUsers(){
        return this.users;
    }
}

class User {
    constructor(){}

    search(query){
        const searchStrategy = new SearchStrategyDefault();
        const search = new Search(searchStrategy);

        return search.performSearch(query);
    }
}

class GuestUser extends User {
    constructor(...args){
        super(...args);
    }
}

class LoggedInUser extends User {
    constructor(username, ...args){
        super(...args);
        this.userId = Math.floor(Math.random()*10000);
        this.username = username;
        this.badges = [];
        this.reputation = 0;
    }

    addBadge(badge){
        this.badges.push(badge);
    }

    removeBadge(id){
        this.badges = this.badges.filter(badge => badge.getId() !== id);
    }

    getBadges(){
        return this.badges;
    }

    incrementReputation(){
        this.reputation++;
    }

    decrementReputation(){
        this.reputation--;
    }

    getReputation(){
        return this.reputation;
    }
}

class Badge {
    constructor(text){
        this.text = text;
    }

    getText(){
        return this.text;
    }
}

class Search {
    constructor(searchStrategy){
        this.searchStrategy = new searchStrategy();
    }

    performSearch(query){
        return this.searchStrategy.performSearch(query);
    }
}

class SearchStrategy {
    constructor(){}

    performSearch(query){}
}

class SearchStrategyDefault extends SearchStrategy {
    constructor(...args){
        super(...args);
        this.results = new Map();
    }

    performSearch(query){
        return this.results.get(query);
    }
}

class TextContainer {
    constructor(author, text){
        this.id = Math.floor(Math.random()*10000);
        this.author = author;
        this.text = text;
        this.upVotes = [];
        this.downVotes = [];
    }

    addUpVote(upVote){
        this.upVotes.push(upVote);
    }

    removeUpVote(id){
        this.upVotes = this.upVotes.filter(upVote => upVote.getId() !== id);
    }

    getUpVotes(){
        return this.downVotes;
    }

    addDownVote(downVote){
        this.downVotes.push(downVote);
    }

    removeDownVote(id){
        this.downVotes = this.downVotes.filter(downVote => downVote.getId() !== id);
    }

    getDownVotes(){
        return this.downVotes;
    }

    setText(text){
        this.text = text;
    }

    getText(){
        return this.text;
    }

    getId(){
        return this.id;
    }
}

class Question extends TextContainer {
    constructor(...args){
        super(...args);
        this.modFlag = false;
        this.tags = [];
        this.comments = [];
        this.answers = [];
    }

    addTag(tag){
        this.tags.push(tag);
    }

    removeTag(id){
        this.tags = this.tags.filter(tag => tag.getId() !== id);
    }

    getTags(){
        return this.tags;
    }

    addComment(comment){
        this.comments.push(comment);
    }

    removeComment(id){
        this.comments = this.comments.filter(comment => comment.getId() !== id);
    }

    getComments(){
        return this.comments;
    }

    addAnswer(answer){
        this.answers.push(answer);
    }

    removeAnswer(id){
        this.answers = this.answers.filter(answer => answer.getId() !== id);
    }

    getAnswers(){
        return this.answers;
    }

    setModFlag(bool){
        this.modFlag = bool;
    }

    getModFlag(){
        return this.modFlag;
    }
}

class Tag {
    constructor(keyword){
        this.id = Math.floor(Math.random()*10000);
        this.keyword = keyword;
    }

    getKeyword(){
        return this.keyword;
    }

    getId(){
        return this.id;
    }
}

class Answer extends TextContainer {
    constructor(...args){
        super(...args);
    }
}

class Comment extends TextContainer {
    constructor(...args){
        super(...args);
    }
}

class Vote {
    constructor(user){
        this.user = user;
        this.id = Math.floor(Math.random()*10000);
    }

    getUser(){
        return this.user;
    }

    getId(){
        return this.id;
    }
}

class UpVote extends Vote {
    constructor(...args){
        super(...args);
    }
}

class DownVote extends Vote {
    constructor(...args){
        super(...args);
    }
}
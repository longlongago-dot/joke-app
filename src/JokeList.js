import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "./JokeList.css";

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {
            //毎度毎度リクエストするのは時間がかかるので、ローカルストレージに入れておく
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        };
        //重複を省く
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        //初めて画面を開いたときのみ発火予定。それ以降はローカルストレージに入れる
        if (this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes() {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                //標準はhtmlがでresがくるので、json形式で返すようにヘッダーに追加情報を書く
                let res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" }
                });
                let newJoke = res.data.joke;
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({ id: uuidv4(), text: newJoke, votes: 0 });
                } else {
                    console.log("FOUND A DUPLICATE!");
                    console.log(newJoke);
                }
            }
            this.setState(pre => ({
                loading: false,
                jokes: [...pre.jokes, ...jokes]
            }));
            //ローカルストレージに情報を入れる
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        } catch (e) {
            alert(e);
            this.setState({ loading: false });
        }
    }
    handleVote(id, delta) {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j
                )
            }),
            () =>
                window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
    }
    handleClick() {
        this.setState({ loading: true }, this.getJokes);
    }
    render() {
        if (this.state.loading) {
            return (
                <div className='JokeList-spinner'>
                    <i className='far fa-8x fa-laugh fa-spin' />
                    <h1 className='JokeList-title'>Loading...</h1>
                </div>
            );
        }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
        return (
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                    <h1 className='JokeList-title'>
                        <span>Dad</span> Jokes
                    </h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick}>
                        Fetch Jokes
                    </button>
                </div>

                <div className='JokeList-jokes'>
                    {jokes.map(j => (
                        <Joke
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
export default JokeList;

import React, { Component } from "react";
import "./Joke.css";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { BsFillEmojiSunglassesFill, BsFillEmojiLaughingFill, BsFillEmojiSmileFill, BsFillEmojiNeutralFill, BsFillEmojiFrownFill, BsFillEmojiSmileUpsideDownFill, BsFillEmojiExpressionlessFill } from "react-icons/bs";

class Joke extends Component {
    getColor() {
        if (this.props.votes >= 15) {
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8BC34A";
        } else if (this.props.votes >= 9) {
            return "#CDDC39";
        } else if (this.props.votes >= 6) {
            return "#FFEB3B";
        } else if (this.props.votes >= 3) {
            return "#FFC107";
        } else if (this.props.votes >= 0) {
            return "#FF9800";
        } else {
            return "#f44336";
        }
    }
    getEmoji() {
        if (this.props.votes >= 15) {
            return <BsFillEmojiSunglassesFill />;
        } else if (this.props.votes >= 12) {
            return <BsFillEmojiLaughingFill />;
        } else if (this.props.votes >= 9) {
            return <BsFillEmojiSmileFill />;
        } else if (this.props.votes >= 6) {
            return <BsFillEmojiNeutralFill />;
        } else if (this.props.votes >= 3) {
            return <BsFillEmojiExpressionlessFill />;
        } else if (this.props.votes >= 0) {
            <BsFillEmojiFrownFill />;
        } else {
            <BsFillEmojiSmileUpsideDownFill />;
        }
    }
    render() {
        return (
            <div className='Joke'>
                <div className='Joke-buttons'>
                    <div className="fas fa-arrow-up" onClick={this.props.upvote}>
                        <FaRegThumbsUp />
                    </div>
                    <span className='Joke-votes' style={{ borderColor: this.getColor() }}>
                        {this.props.votes}
                    </span>
                    <div className="fas fa-arrow-down" onClick={this.props.downvote}>
                        <FaRegThumbsDown />
                    </div>
                </div>
                <div className='Joke-text'>{this.props.text}</div>
                <div className='Joke-smiley'>
                    {this.getEmoji()}
                </div>
            </div>
        );
    }
}
export default Joke;

import React from 'react';
import propTypes from 'prop-types';

import { View, Text, Button, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {

    static propTypes = {
        randomNumCount: propTypes.number.isRequired,
        initialSeconds: propTypes.number.isRequired,
        onPlayAgain: propTypes.func.isRequired,
    };

    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    };

    gameStatus = 'PLAYING';

    randomNums = Array
        .from({ length: this.props.randomNumCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNums
        .slice(0, this.props.randomNumCount - 2)
        .reduce((acc, curr) => acc + curr, 0); 

    shuffledRandomNumbers = shuffle(this.randomNums);

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            }, () => {
                if (this.state.remainingSeconds === 0 ) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex],
        }));
    };

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedIds !== this.state.selectedIds || 
            nextState.remainingSeconds === 0
            ) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    //gameStatus: PLAIYING, WON, LOST
    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        // console.warn(sumSelected);
        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target){
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    };

    render() {

    let remainingTimeText;
    if (this.state.remainingSeconds === 1) {
        remainingTimeText = <Text style={styles.timeRemaining}>Time left unil Game ends: {this.state.remainingSeconds} second</Text>
    } else {
        remainingTimeText = <Text style={styles.timeRemaining}>Time left until Game ends: {this.state.remainingSeconds} seconds</Text>
    };

        const gameStatus = this.gameStatus;
        return (
        <View style={styles.container}>
            <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                {this.target}
            </Text>
            <View style={styles.randomContainer}>
            {this.shuffledRandomNumbers.map((randomNum, index) =>
                <RandomNumber 
                    key={index}
                    id={index}
                    number={randomNum} 
                    isDisabled={
                        this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                    }
                    onPress={this.selectNumber}
                />
            )}
            </View>
            {this.gameStatus !== "PLAYING" &&  (
                <Button
                title="Play Again"
                onPress={this.props.onPlayAgain}
            />
            )}
            {remainingTimeText}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 50,
    },
    target: {
        fontSize: 50,
        backgroundColor: '#bbb',
        margin: 50,
        textAlign: 'center',
    },
    randomContainer: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    timeRemaining: {
        textAlign: 'center',
        marginBottom: 50,
        fontSize: 20,
    },
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb'
    },
    STATUS_WON: {
        backgroundColor: 'green'
    },
    STATUS_LOST: {
        backgroundColor: 'red'
    },
});

export default Game;
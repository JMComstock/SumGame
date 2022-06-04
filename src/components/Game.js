import React from 'react';
import propTypes from 'prop-types';

import { View, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component {

    static propTypes = {
        randomNumCount: propTypes.number.isRequired,
    };

    state = {
        selectedNumbers: [],
    }

    randomNums = Array
        .from({ length: this.props.randomNumCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNums
        .slice(0, this.props.randomNumCount - 2)
        .reduce((acc, curr) => acc + curr, 0); 
    // TODO: shuffle random numbers

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.target}>{this.target}</Text>
            <View style={styles.randomContainer}>
            {this.randomNums.map((randomNum, index) =>
                <RandomNumber 
                    key={index} 
                    number={randomNum} 
                    isSelected={this.isNumberSelected(index)}
                />
            )}
            </View>
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
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    }
});

export default Game;
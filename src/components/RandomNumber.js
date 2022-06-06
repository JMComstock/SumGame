import React from 'react';

import propTypes from 'prop-types';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class RandomNumber extends React.Component {

    static propTypes = {
        id: propTypes.number.isRequired,
        number: propTypes.number.isRequired,
        isDisabled: propTypes.bool.isRequired,
        onPress: propTypes.func.isRequired,
    };

    handlePress = () => {
        if (this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>           
                <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
                    {this.props.number}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#999',
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.3,
    }
});

export default RandomNumber;
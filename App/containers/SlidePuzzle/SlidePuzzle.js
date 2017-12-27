import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import styles from './styles';
import PuzzlePiece from '../../components/PuzzlePiece';
import { colors } from '../../config';

const { width } = Dimensions.get('screen');
const canvasSize = width - (width / 5);

export default class SlidePuzzle extends Component {
    static defaultProps = {
        ...Component.defaultProps,
        showNumbers: true,
        numberColor: colors.primary
    }

    constructor(props) {
        super(props);
        this.state = {
            puzzle: [],
            movements: 1
        };
    }

    componentWillMount() {
        this.setState({
            puzzle: [[4, 3, 6], [1, 8, 5], [2, 7, 9]]
        });
        this.initializeBoard();
    }

    initializeBoard = () => {
        const { columns } = this.props;
        const board = [];
        let shufledBoard = [];
        let row = [];
        const newBoard = [];
        const boardSize = columns * columns;
        for (let i = 1; i <= boardSize; i++) {
            board.push(i);
        }
        shufledBoard = this.shuffle(board);

        for (let i = 0; i < columns; i++) {
            row = [];
            for (let j = 0; j < columns; j++) {
                row.push(shufledBoard[(i * columns) + j]);
            }
            newBoard.push(row);
        }

        this.setState({
            puzzle: newBoard
        });
    }

    shuffle = (array) => {
        let currentIndex = array.length;
        let temporaryValue = 0;
        let randomIndex = 0;
        const resultArray = array;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = resultArray[currentIndex];
            resultArray[currentIndex] = resultArray[randomIndex];
            resultArray[randomIndex] = temporaryValue;
        }

        return resultArray;
    }

    move = (line, column) => {
        const { puzzle, movements } = this.state;
        const puzzleCopy = puzzle;
        const lastPiece = this.props.columns * this.props.columns;
        let moved = false;

        if (puzzle[line][column] === (lastPiece)) return;

        if (line + 1 < this.props.columns) {
            if (puzzle[line + 1][column] === (lastPiece)) {
                // can move down
                puzzleCopy[line + 1][column] = puzzle[line][column];
                puzzleCopy[line][column] = (lastPiece);
                moved = true;
            }
        }

        if (line - 1 >= 0 && !moved) {
            if (puzzle[line - 1][column] === (lastPiece)) {
                // can move up
                puzzleCopy[line - 1][column] = puzzle[line][column];
                puzzleCopy[line][column] = (lastPiece);
                moved = true;
            }
        }

        if (column + 1 < this.props.columns && !moved) {
            if (puzzle[line][column + 1] === (lastPiece)) {
                // can move right
                puzzleCopy[line][column + 1] = puzzle[line][column];
                puzzleCopy[line][column] = (lastPiece);
                moved = true;
            }
        }

        if (column - 1 >= 0 && !moved) {
            if (puzzle[line][column - 1] === (lastPiece)) {
                // can move left
                puzzleCopy[line][column - 1] = puzzle[line][column];
                puzzleCopy[line][column] = (lastPiece);
                moved = true;
            }
        }


        if (moved) {
            this.setState({ puzzle: puzzleCopy, movements: (movements + 1) });
            this.props.onMove(this.state.movements);
        }

        console.log(puzzle);

        if (this.isSolved()) {
            this.props.onFinish();
        }
    }

    isSolved = () => {
        // check if numbers on puzzle board are ordened
        const { puzzle } = this.state;
        const { columns } = this.props;
        let oldValue = 0;

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < columns; j++) {
                if (puzzle[i][j] !== (oldValue + 1)) {
                    console.log('Ainda não resolvido!');
                    return false;
                }
                oldValue++;
            }
        }
        return true;
    }

    _renderPieces(line, column, number) {
        const { columns, showNumbers, numberColor } = this.props;
        const pieceSize = canvasSize / columns;
        const lastPiece = this.props.columns * this.props.columns;
        return (
            <PuzzlePiece
                key={`${line} ${column}`}
                pieceSize={pieceSize}
                showNumbers={showNumbers}
                numberColor={numberColor}
                line={line}
                column={column}
                number={number}
                lastPiece={lastPiece}
                handlePress={() => this.move(line, column)} />
        );
    }

    _loadBoard() {
        const { puzzle } = this.state;
        const { columns } = this.props;
        const pieces = [];
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < columns; j++) {
                pieces.push(this._renderPieces(i, j, puzzle[i][j]));
            }
        }
        return (pieces);
    }

    render() {
        return (
            <View style={[styles.canvas, { width: canvasSize, height: canvasSize }]}>
                {this._loadBoard()}
            </View>
        );
    }
}

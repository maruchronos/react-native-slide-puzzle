import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import styles from './styles';
import PuzzlePiece from '../../components/PuzzlePiece';
import { colors } from '../../config';

const { width } = Dimensions.get('screen');
const canvasSize = width - (width / 5);

// const { UIManager } = NativeModules;
// UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);

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
            movements: 0
        };
    }

    componentWillMount() {
        this.setState({
            puzzle: [[8, 5, 1], [4, 7, 3], [2, 9, 6]]
        });
        this.initializeBoard();
    }

    initializeBoard = () => {
        const { columns } = this.props;
        const board = [];
        let shuffledBoard = [];
        let row = [];
        const newBoard = [];
        const boardSize = columns * columns;

        // Create ordened array
        for (let i = 1; i < boardSize; i++) {
            board.push(i);
        }

        // Shuffle array
        shuffledBoard = this.shuffle(board);
        shuffledBoard.push(boardSize);
        // shuffledBoard = [8, 5, 1, 4, 7, 3, 2, 9, 6]; caso falho

        let fixedArray = [];

        // Check if array is solveable and fix if its not
        if (!this.canSolve(shuffledBoard, columns)) {
            console.log('Board not solveable', shuffledBoard);
            fixedArray = [shuffledBoard[1], shuffledBoard[0], ...shuffledBoard.slice(2)];
            console.log('Change first positions', fixedArray);
        } else {
            console.log('Board is solveable', shuffledBoard);
            fixedArray = shuffledBoard;
        }

        // Create Matrix
        for (let i = 0; i < columns; i++) {
            row = [];
            for (let j = 0; j < columns; j++) {
                row.push(fixedArray[(i * columns) + j]);
            }
            newBoard.push(row);
        }


        this.setState({
            puzzle: newBoard,
            movements: 1
        }, this.props.onLoad(0));
    }

    canSolve = (array, columns) => {
        // console.log(array);
        let totalInversions = 0;
        let holeLine = 1;
        for (let i = 0; i < array.length; i++) {
            let inversions = 0;
            for (let j = 0; j < i; j++) {
                if ((array[j] > array[i])) {
                    inversions++;
                }
            }
            console.log(`${array[i]} possui ${inversions} inversions`);
            totalInversions += inversions;
            if (array[i] === array.length) {
                holeLine = parseInt(i / columns, 10) + 1;
            }
        }
        const sum = totalInversions + holeLine;
        console.log(sum, totalInversions, holeLine);
        return (sum % 2 === columns % 2);
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
            // LayoutAnimation.easeInEaseOut();
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
            <View style={[styles.canvas, { width: canvasSize + 2, height: canvasSize + 2 }]}>
                {this._loadBoard()}
            </View>
        );
    }
}

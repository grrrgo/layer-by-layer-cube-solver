/**
 * Created by tzhang on 5/10/17.
 */
var app = angular.module('app', []);

app.controller('cubeController', function($scope) {
    var tileCount = [0, 1, 2], reverseTileCount = [2, 1, 0];

    var combineSteps = function (steps) {
        var moves = steps.split(',');
        moves.splice(moves.length - 1, 1);
        console.log('before combining', moves);
        moves.map(function (move, index) {
            if (index != moves.length - 1) {
                if (move == moves[index + 1] + '\'' || move + '\'' == moves[index + 1]) {
                    moves.splice(index, 2)
                }
            }
        });
        moves.map(function (move, index) {
            var repetition = 1, originalIndex = index;
            while (true) {
                if (move == moves[index + 1]) {
                    repetition += 1;
                    index += 1;
                } else {
                    switch (repetition) {
                        case 2:
                            moves[originalIndex] = move + String(repetition);
                            break;
                        case 3:
                            moves[originalIndex] = move.indexOf('\'')>=0 ? move[0] : move+'\'';
                            break;
                        case 4:
                            moves[originalIndex] = '';
                            break;

                    }
                    moves.splice(originalIndex + 1, repetition - 1);
                    break
                }
            }
        });
        console.log('after combining', moves);
        return moves.filter(function(n){ return n != '' }).join(', ')
    };

    $scope.cube = {
        faces:{},
        scrambleSteps: '',
        manualScrambleSteps: '',
        steps: {
            'one':'',
            'two':'',
            'three':'',
            'four':'',
            'five':'',
            'six':'',
            'seven':''
        }
    };

    $scope.cube.reset = function(){
        $scope.cube.faces.back = [
            ['orange', 'orange', 'orange'],
            ['orange', 'orange', 'orange'],
            ['orange', 'orange', 'orange']
        ];
        $scope.cube.faces.left = [
            ['blue', 'blue', 'blue'],
            ['blue', 'blue', 'blue'],
            ['blue', 'blue', 'blue']
        ];
        $scope.cube.faces.up = [
            ['yellow', 'yellow', 'yellow'],
            ['yellow', 'yellow', 'yellow'],
            ['yellow', 'yellow', 'yellow']
        ];
        $scope.cube.faces.right = [
            ['green', 'green', 'green'],
            ['green', 'green', 'green'],
            ['green', 'green', 'green']
        ];
        $scope.cube.faces.down = [
            ['white', 'white', 'white'],
            ['white', 'white', 'white'],
            ['white', 'white', 'white']
        ];
        $scope.cube.faces.front = [
            ['red', 'red', 'red'],
            ['red', 'red', 'red'],
            ['red', 'red', 'red']
        ];
        $scope.cube.scrambleSteps = '';
        $scope.cube.manualScrambleSteps = ''
        $scope.cube.steps = {
            'one':'',
            'two':'',
            'three':'',
            'four':'',
            'five':'',
            'six':'',
            'seven':''
        }
    };

    $scope.cube.R = function (prime) {
        var i;
        var originalUp = angular.copy($scope.cube.faces.up);
        var originalBack = angular.copy($scope.cube.faces.back);
        var originalDown = angular.copy($scope.cube.faces.down);
        var originalFront = angular.copy($scope.cube.faces.front);
        var originalRight = angular.copy($scope.cube.faces.right);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.right[i][0] = originalRight[0][reverseTileCount[i]];
                $scope.cube.faces.right[2][i] = originalRight[i][0];
                $scope.cube.faces.right[reverseTileCount[i]][2] = originalRight[2][i];
                $scope.cube.faces.right[0][reverseTileCount[i]] = originalRight[reverseTileCount[i]][2];

                $scope.cube.faces.front[i][2] = originalUp[i][2];
                $scope.cube.faces.up[i][2] = originalBack[i][2];
                $scope.cube.faces.down[reverseTileCount[i]][0] = originalFront[i][2];
                $scope.cube.faces.back[reverseTileCount[i]][2] = originalDown[i][0];
            }
            $scope.cube.manualScrambleSteps += 'R\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.right[0][i] = originalRight[reverseTileCount[i]][0];
                $scope.cube.faces.right[i][2] = originalRight[0][i];
                $scope.cube.faces.right[2][reverseTileCount[i]] = originalRight[i][2];
                $scope.cube.faces.right[reverseTileCount[i]][0] = originalRight[2][reverseTileCount[i]];

                $scope.cube.faces.down[reverseTileCount[i]][0] = originalBack[i][2];
                $scope.cube.faces.front[i][2] = originalDown[reverseTileCount[i]][0];
                $scope.cube.faces.up[i][2] = originalFront[i][2];
                $scope.cube.faces.back[i][2] = originalUp[i][2];
            }
            $scope.cube.manualScrambleSteps += 'R,'
        }
    };

    $scope.cube.L = function (prime) {
        var i;
        var originalUp = angular.copy($scope.cube.faces.up);
        var originalBack = angular.copy($scope.cube.faces.back);
        var originalDown = angular.copy($scope.cube.faces.down);
        var originalFront = angular.copy($scope.cube.faces.front);
        var originalLeft = angular.copy($scope.cube.faces.left);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.left[0][i] = originalLeft[i][2];
                $scope.cube.faces.left[reverseTileCount[i]][0] = originalLeft[0][i];
                $scope.cube.faces.left[2][i] = originalLeft[i][0];
                $scope.cube.faces.left[i][2] = originalLeft[2][reverseTileCount[i]];

                $scope.cube.faces.down[i][2] = originalBack[reverseTileCount[i]][0];
                $scope.cube.faces.front[i][0] = originalDown[reverseTileCount[i]][2];
                $scope.cube.faces.up[i][0] = originalFront[i][0];
                $scope.cube.faces.back[i][0] = originalUp[i][0];
            }
            $scope.cube.manualScrambleSteps += 'L\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.left[i][0] = originalLeft[2][i];
                $scope.cube.faces.left[0][reverseTileCount[i]] = originalLeft[i][0];
                $scope.cube.faces.left[reverseTileCount[i]][2] = originalLeft[0][reverseTileCount[i]];
                $scope.cube.faces.left[2][i] = originalLeft[reverseTileCount[i]][2];

                $scope.cube.faces.front[i][0] = originalUp[i][0];
                $scope.cube.faces.up[i][0] = originalBack[i][0];
                $scope.cube.faces.down[i][2] = originalFront[reverseTileCount[i]][0];
                $scope.cube.faces.back[i][0] = originalDown[reverseTileCount[i]][2];
            }
            $scope.cube.manualScrambleSteps += 'L,'
        }
    };

    $scope.cube.U = function (prime) {
        var i;
        var originalUp = angular.copy($scope.cube.faces.up);
        var originalBack = angular.copy($scope.cube.faces.back);
        var originalLeft = angular.copy($scope.cube.faces.left);
        var originalFront = angular.copy($scope.cube.faces.front);
        var originalRight = angular.copy($scope.cube.faces.right);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.up[0][i] = originalUp[i][2];
                $scope.cube.faces.up[i][2] = originalUp[2][reverseTileCount[i]];
                $scope.cube.faces.up[2][reverseTileCount[i]] = originalUp[reverseTileCount[i]][0];
                $scope.cube.faces.up[reverseTileCount[i]][0] = originalUp[0][i];

                $scope.cube.faces.front[0][i] = originalLeft[i][2];
                $scope.cube.faces.left[i][2] = originalBack[2][reverseTileCount[i]];
                $scope.cube.faces.right[reverseTileCount[i]][0] = originalFront[0][i];
                $scope.cube.faces.back[2][i] = originalRight[i][0];
            }
            $scope.cube.manualScrambleSteps += 'U\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.up[i][2] = originalUp[0][i];
                $scope.cube.faces.up[2][i] = originalUp[reverseTileCount[i]][2];
                $scope.cube.faces.up[reverseTileCount[i]][0] = originalUp[2][reverseTileCount[i]];
                $scope.cube.faces.up[0][i] = originalUp[reverseTileCount[i]][0];

                $scope.cube.faces.right[i][0] = originalBack[2][i];
                $scope.cube.faces.front[0][i] = originalRight[reverseTileCount[i]][0];
                $scope.cube.faces.left[i][2] = originalFront[0][i];
                $scope.cube.faces.back[2][i] = originalLeft[reverseTileCount[i]][2];
            }
            $scope.cube.manualScrambleSteps += 'U,'
        }
    };

    $scope.cube.D = function (prime) {
        var i;
        var originalDown = angular.copy($scope.cube.faces.down);
        var originalBack = angular.copy($scope.cube.faces.back);
        var originalLeft = angular.copy($scope.cube.faces.left);
        var originalFront = angular.copy($scope.cube.faces.front);
        var originalRight = angular.copy($scope.cube.faces.right);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.down[0][i] = originalDown[i][2];
                $scope.cube.faces.down[i][2] = originalDown[2][reverseTileCount[i]];
                $scope.cube.faces.down[2][reverseTileCount[i]] = originalDown[reverseTileCount[i]][0];
                $scope.cube.faces.down[reverseTileCount[i]][0] = originalDown[0][i];

                $scope.cube.faces.right[i][2] = originalBack[0][i];
                $scope.cube.faces.front[2][i] = originalRight[reverseTileCount[i]][2];
                $scope.cube.faces.left[i][0] = originalFront[2][i];
                $scope.cube.faces.back[0][i] = originalLeft[reverseTileCount[i]][0];
            }
            $scope.cube.manualScrambleSteps += 'D\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.down[i][2] = originalDown[0][i];
                $scope.cube.faces.down[2][i] = originalDown[reverseTileCount[i]][2];
                $scope.cube.faces.down[reverseTileCount[i]][0] = originalDown[2][reverseTileCount[i]];
                $scope.cube.faces.down[0][i] = originalDown[reverseTileCount[i]][0];

                $scope.cube.faces.front[2][i] = originalLeft[i][0];
                $scope.cube.faces.left[i][0] = originalBack[0][reverseTileCount[i]];
                $scope.cube.faces.right[reverseTileCount[i]][2] = originalFront[2][i];
                $scope.cube.faces.back[0][i] = originalRight[i][2];
            }
            $scope.cube.manualScrambleSteps += 'D,'
        }
    };

    $scope.cube.F = function (prime) {
        var i;
        var originalDown = angular.copy($scope.cube.faces.down);
        var originalUp = angular.copy($scope.cube.faces.up);
        var originalLeft = angular.copy($scope.cube.faces.left);
        var originalFront = angular.copy($scope.cube.faces.front);
        var originalRight = angular.copy($scope.cube.faces.right);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.front[0][i] = originalFront[i][2];
                $scope.cube.faces.front[i][2] = originalFront[2][reverseTileCount[i]];
                $scope.cube.faces.front[2][reverseTileCount[i]] = originalFront[reverseTileCount[i]][0];
                $scope.cube.faces.front[reverseTileCount[i]][0] = originalFront[0][i];

                $scope.cube.faces.right[2][i] = originalDown[2][i];
                $scope.cube.faces.left[2][i] = originalUp[2][i];
                $scope.cube.faces.down[2][i] = originalLeft[2][i];
                $scope.cube.faces.up[2][i] = originalRight[2][i];
            }
            $scope.cube.manualScrambleSteps += 'F\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.front[i][2] = originalFront[0][i];
                $scope.cube.faces.front[2][i] = originalFront[reverseTileCount[i]][2];
                $scope.cube.faces.front[reverseTileCount[i]][0] = originalFront[2][reverseTileCount[i]];
                $scope.cube.faces.front[0][i] = originalFront[reverseTileCount[i]][0];

                $scope.cube.faces.right[2][i] = originalUp[2][i];
                $scope.cube.faces.down[2][i] = originalRight[2][i];
                $scope.cube.faces.left[2][i] = originalDown[2][i];
                $scope.cube.faces.up[2][i] = originalLeft[2][i];
            }
            $scope.cube.manualScrambleSteps += 'F,'
        }
    };

    $scope.cube.B = function (prime) {
        var i;
        var originalDown = angular.copy($scope.cube.faces.down);
        var originalUp = angular.copy($scope.cube.faces.up);
        var originalLeft = angular.copy($scope.cube.faces.left);
        var originalBack = angular.copy($scope.cube.faces.back);
        var originalRight = angular.copy($scope.cube.faces.right);
        if (prime) {
            for (i in tileCount) {
                $scope.cube.faces.back[0][i] = originalBack[i][2];
                $scope.cube.faces.back[i][2] = originalBack[2][reverseTileCount[i]];
                $scope.cube.faces.back[2][reverseTileCount[i]] = originalBack[reverseTileCount[i]][0];
                $scope.cube.faces.back[reverseTileCount[i]][0] = originalBack[0][i];

                $scope.cube.faces.right[0][i] = originalUp[0][i];
                $scope.cube.faces.left[0][i] = originalDown[0][i];
                $scope.cube.faces.down[0][i] = originalRight[0][i];
                $scope.cube.faces.up[0][i] = originalLeft[0][i];
            }
            $scope.cube.manualScrambleSteps += 'B\','
        } else {
            for (i in tileCount) {
                $scope.cube.faces.back[i][2] = originalBack[0][i];
                $scope.cube.faces.back[2][i] = originalBack[reverseTileCount[i]][2];
                $scope.cube.faces.back[reverseTileCount[i]][0] = originalBack[2][reverseTileCount[i]];
                $scope.cube.faces.back[0][i] = originalBack[reverseTileCount[i]][0];

                $scope.cube.faces.right[0][i] = originalDown[0][i];
                $scope.cube.faces.down[0][i] = originalLeft[0][i];
                $scope.cube.faces.left[0][i] = originalUp[0][i];
                $scope.cube.faces.up[0][i] = originalRight[0][i];
            }
            $scope.cube.manualScrambleSteps += 'B,'
        }
    };

    var executeAlgorithm = function (algorithmArray) {
        console.log(algorithmArray.join(', '));
        var step;
        for (var index in algorithmArray) {
            step = algorithmArray[index];
            if (step.length == 3) {
                // X'2
                $scope.cube[step[0]](true);
                $scope.cube[step[0]](true);
            } else if (step.length == 2) {
                if (step.indexOf('2')>=0) {
                    // X2
                    $scope.cube[step[0]]();
                    $scope.cube[step[0]]();
                } else {
                    // X'
                    $scope.cube[step[0]](true);
                }
            } else {
                // X
                $scope.cube[step[0]]();
            }
        }
    };

    $scope.cube.scramble = function () {
        $scope.cube.reset();
        var moves = ['R', 'R\'', 'L', 'L\'', 'U', 'U\'', 'D', 'D\'', 'F', 'F\'', 'B', 'B\''];
        var steps=[];
        while (true) {
            var randomIndex = Math.floor(Math.random()*12);
            if (steps.length >= 1) {
                //1. should not be canceling the previous step, e.g.: R, R'
                if (randomIndex % 2 == 0 ) {
                    //even index (R, L, U...), should be removed if previous step is the prime or prime2 of the same move
                    if (steps[steps.length - 1].substr(0,2) == moves[randomIndex] + '\''){
                        continue;
                    }
                } else {
                    //odd index (R', L', U'...), should be removed if previous step is the same move or *2 without prime
                    if (steps[steps.length - 1] == moves[randomIndex][0] ||
                        steps[steps.length - 1] == moves[randomIndex][0] + '2') {
                        continue;
                    }
                }
                //2. From 2nd move on, one move should not be repeated consecutively for 3 or more times, e.g.: R2, R
                if (steps[steps.length - 1] == moves[randomIndex] + '2') {
                    continue;
                }
            }
            //concat duplicate moves, e.g.: U, U -> U2
            if (steps[steps.length - 1] == moves[randomIndex]) {
                steps[steps.length - 1] += '2';
                continue
            }

            steps.push(moves[randomIndex]);

            if (steps.length == 20) {
                break;
            }
        }

        executeAlgorithm(steps);

        $scope.cube.scrambleSteps = steps.join(', ');
        console.log('scrambleSteps', $scope.cube.scrambleSteps);
    };

    //step 1
    $scope.cube.cross = function() {
        $scope.cube.manualScrambleSteps ='';
        $scope.cube.steps.one = '';

        var order,
            edgeSolved = {},
            faces = ['up', 'front', 'left', 'right', 'back'];

        var orientCross = function () {
            while (true) {
                var matching = countBottomEdgesMatch();
                if (matching.count !== 2 && matching.count !== 4) {
                    executeAlgorithm(['D']);
                } else {
                    break
                }
            }
            return matching;
        };

        var findWhiteEdges = function (face) {
            var edgePieces = [
                {'x':0, 'y':1},
                {'x':1, 'y':0},
                {'x':1, 'y':2},
                {'x':2, 'y':1}
            ];

            for (var i in edgePieces) {
                if ($scope.cube.faces[face][edgePieces[i].x][edgePieces[i].y] == 'white') {
                    return {
                        'face': face, 'white': edgePieces[i].x + '-' + edgePieces[i].y
                    }
                }
            }
        };

        var getSolvedEdges = function () {
            edgeSolved = {
                'front': $scope.cube.faces.down[2][1] == 'white',
                'back' : $scope.cube.faces.down[0][1] == 'white',
                'left' : $scope.cube.faces.down[1][2] == 'white',
                'right' : $scope.cube.faces.down[1][0] == 'white'
            };
            var tempArray = [], keys =Object.keys(edgeSolved);
            for (var key in keys) {
                if (edgeSolved[keys[key]] == true) tempArray.push(keys[key])
            }
            return tempArray
        };

        var solveAnEdge = function () {
            var bottomWhiteTiles = getSolvedEdges();
            var avaliableEdges = faces.filter(function (face) {
                return bottomWhiteTiles.indexOf(face) <0
            });
            avaliableEdges.splice(0,1); //remove 'up'
            var solveForFront = function() {
                switch (firstEdgeWithWhite.white) {
                    case '0-1':
                        executeAlgorithm(['F', 'R\'', 'F\'']);
                        break;
                    case '1-0':
                        executeAlgorithm(['F2', 'R\'', 'F2']);
                        break;
                    case '1-2':
                        executeAlgorithm(['R\'']);
                        break;
                    case '2-1':
                        executeAlgorithm(['F\'', 'R\'']);
                        break;
                }
            };

            var solveForBack = function () {
                switch (firstEdgeWithWhite.white) {
                    case '0-1':
                        executeAlgorithm(['B', 'R', 'B\'']);
                        break;
                    case '1-0':
                        executeAlgorithm(['B2', 'R', 'B2']);
                        break;
                    case '1-2':
                        executeAlgorithm(['R']);
                        break;
                    case '2-1':
                        executeAlgorithm(['B\'', 'R', 'B']);
                        break;
                }
            };

            var solveForLeft = function () {
                switch (firstEdgeWithWhite.white) {
                    case '0-1':
                        executeAlgorithm(['L2', 'F\'', 'L2']);
                        break;
                    case '1-0':
                        executeAlgorithm(['L\'','F\'', 'L']);
                        break;
                    case '1-2':
                        executeAlgorithm(['L', 'F\'', 'L\'']);
                        break;
                    case '2-1':
                        executeAlgorithm(['F\'']);
                        break;
                }
            };

            var solveForRight = function () {
                switch (firstEdgeWithWhite.white) {
                    case '0-1':
                        executeAlgorithm(['R2', 'F', 'R2']);
                        break;
                    case '1-0':
                        executeAlgorithm(['R\'', 'F', 'R']);
                        break;
                    case '1-2':
                        executeAlgorithm(['R', 'F', 'R\'']);
                        break;
                    case '2-1':
                        executeAlgorithm(['F']);
                        break;
                }
            };

            var solveForUp = function () {
                switch (firstEdgeWithWhite.white) {
                    case '0-1':
                        executeAlgorithm(['U2', 'F2']);
                        break;
                    case '1-0':
                        executeAlgorithm(['U\'', 'F2']);
                        break;
                    case '1-2':
                        executeAlgorithm(['U', 'F2']);
                        break;
                    case '2-1':
                        executeAlgorithm(['F2']);
                        break;
                }
            };

            for (var i in faces) {
                var firstEdgeWithWhite = findWhiteEdges(faces[i]);
                if (firstEdgeWithWhite != undefined) break
            }

            if (firstEdgeWithWhite == undefined) return;

            switch (firstEdgeWithWhite.face){
                case 'front':
                    console.log('solving front white piece...');
                    if (bottomWhiteTiles.indexOf('right') >= 0) {
                        firstEdgeWithWhite.white == '2-1'?executeAlgorithm(['F\'']):undefined;
                        switch (avaliableEdges[0]) {
                            case 'front':
                                executeAlgorithm(['D']);
                                break;
                            case 'left':
                                executeAlgorithm(['D2']);
                                break;
                            case 'back':
                                executeAlgorithm(['D\'']);
                                break;
                        }
                        firstEdgeWithWhite.white == '2-1'?executeAlgorithm(['F']):undefined;
                        solveForFront()
                    } else {
                        solveForFront()
                    }
                    break;
                case 'back':
                    console.log('solving back white piece...');
                    if (bottomWhiteTiles.indexOf('right') >= 0) {
                        firstEdgeWithWhite.white == '0-1'?executeAlgorithm(['B\'']):undefined;
                        switch (avaliableEdges[0]) {
                            case 'front':
                                executeAlgorithm(['D']);
                                break;
                            case 'left':
                                executeAlgorithm(['D2']);
                                break;
                            case 'back':
                                executeAlgorithm(['D\'']);
                                break;
                        }
                        firstEdgeWithWhite.white == '0-1'?executeAlgorithm(['B']):undefined;
                        solveForBack()
                    } else {
                        solveForBack()
                    }
                    break;
                case 'left':
                    console.log('solving left white piece...');
                    if (bottomWhiteTiles.indexOf('front') >= 0) {
                        firstEdgeWithWhite.white == '1-0'?executeAlgorithm(['L\'']):undefined;
                        switch (avaliableEdges[0]) {
                            case 'right':
                                executeAlgorithm(['D\'']);
                                break;
                            case 'left':
                                executeAlgorithm(['D']);
                                break;
                            case 'back':
                                executeAlgorithm(['D2']);
                                break;
                        }
                        firstEdgeWithWhite.white == '1-0'?executeAlgorithm(['L']):undefined;
                        solveForLeft()
                    } else {
                        solveForLeft()
                    }
                    break;
                case 'right':
                    console.log('solving right white piece...');
                    if (bottomWhiteTiles.indexOf('front') >= 0) {
                        firstEdgeWithWhite.white == '1-2'?executeAlgorithm(['R\'']):undefined;
                        switch (avaliableEdges[0]) {
                            case 'right':
                                executeAlgorithm(['D\'']);
                                break;
                            case 'left':
                                executeAlgorithm(['D']);
                                break;
                            case 'back':
                                executeAlgorithm(['D2']);
                                break;
                        }
                        firstEdgeWithWhite.white == '1-2'?executeAlgorithm(['R']):undefined;
                        solveForRight()
                    } else {
                        solveForRight()
                    }
                    break;
                case 'up':
                    console.log('solving up white piece...');
                    if (bottomWhiteTiles.indexOf('front') >= 0) {
                        switch (avaliableEdges[0]) {
                            case 'right':
                                executeAlgorithm(['D\'']);
                                break;
                            case 'left':
                                executeAlgorithm(['D']);
                                break;
                            case 'back':
                                executeAlgorithm(['D2']);
                                break;
                        }
                        solveForUp()
                    } else {
                        solveForUp()
                    }
                    break;
            }
        };

        while (getSolvedEdges().length < 4) {
            solveAnEdge()
        }

        var countBottomEdgesMatch = function() {
            order = [
                $scope.cube.faces.front[2][1],
                $scope.cube.faces.right[1][2],
                $scope.cube.faces.back[0][1],
                $scope.cube.faces.left[1][0]
            ];
            var centers = ['red', 'green', 'orange', 'blue'],
                i, edges = {
                'count': 0,
                'noneMatchingEdges': [],
                'positions': ''
            },
                indexes = [];

            for (i in order) {
                if (order[i] == centers[i]) {
                    edges.count++;
                    indexes.push(i)
                } else {
                    edges.noneMatchingEdges.push(centers[i])
                }
            }

            if (edges.count == 2) {
                edges.positions = Math.abs(indexes[1] - indexes[0]) == 2?'opposite':'adjacent';
            }
            return edges
        };

        var match = orientCross();
        
        if (match.count == 2) {
            if (match.positions == 'opposite') {
                match.noneMatchingEdges.indexOf('red')>=0?
                    executeAlgorithm(['F2', 'B2', 'U2', 'F2', 'B2']):
                    executeAlgorithm(['R2', 'L2', 'U2', 'R2', 'L2'])
            } else {
                match.noneMatchingEdges.indexOf('red')>=0?
                    (match.noneMatchingEdges.indexOf('green')>=0?
                        executeAlgorithm(['F\'', 'D\'', 'F', 'D', 'F\'']):
                        executeAlgorithm(['F', 'D', 'F\'', 'D\'', 'F'])):
                    (match.noneMatchingEdges.indexOf('green')>=0?
                        executeAlgorithm(['B', 'D', 'B\'', 'D\'', 'B']):
                        executeAlgorithm(['B\'', 'D\'', 'B', 'D', 'B\'']));
            }
        }

        $scope.cube.steps.one = combineSteps(angular.copy($scope.cube.manualScrambleSteps));
        $scope.cube.manualScrambleSteps = '';
    };

    //step 2
    $scope.cube.bottomCorners = function () {
        $scope.cube.manualScrambleSteps ='';
        $scope.cube.steps.two = '';

        var cornerSolved;

        var getSolvedCorners = function() {
            cornerSolved = {
                'FL':
                $scope.cube.faces.front[2][0] == 'red' &&
                $scope.cube.faces.left[2][0] == 'blue' &&
                $scope.cube.faces.down[2][2] == 'white',
                'FR':
                $scope.cube.faces.front[2][2] == 'red' &&
                $scope.cube.faces.right[2][2] == 'green' &&
                $scope.cube.faces.down[2][0] == 'white',
                'BL':
                $scope.cube.faces.back[0][0] == 'orange' &&
                $scope.cube.faces.left[0][0] == 'blue' &&
                $scope.cube.faces.down[0][2] == 'white',
                'BR':
                $scope.cube.faces.back[0][2] == 'red' &&
                $scope.cube.faces.right[0][2] == 'green' &&
                $scope.cube.faces.down[0][0] == 'white'
            };

            var tempArray = [], keys =Object.keys(cornerSolved);
            for (var key in keys) {
                if (cornerSolved[keys[key]] == true) tempArray.push(keys[key])
            }
            return tempArray
        };

        var solveACorner = function () {
            var solvedCorners = getSolvedCorners();


        }
    };

    $scope.cube.reset();

});


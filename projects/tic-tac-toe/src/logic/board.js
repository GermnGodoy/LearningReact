export const checkWinner = (index, board) => {
    const winningChances = []
    
    if (index%3 === Math.floor(index/3)) {
      const winningIndex = [0,4,8]
      winningChances.push(winningIndex)
    }

    if (index%3 + Math.floor(index/3) === 2) {
      const winningIndex = [2,4,6]
      winningChances.push(winningIndex)
    }

     winningChances.push([...Array(3).keys()].map( (element) => {
       return ((element * 3) + index%3)
     }))

    winningChances.push([...Array(3).keys()].map( (element) => {
      return (element + (3 * (Math.floor(index/3))))
    }))

    let win = false

    winningChances.forEach(
      (winningChance) => {
        let match = 0
        winningChance.forEach(
          (element) => {
            if (board[index] == board[element]) match++
            if (match === 3) win = true
          }
        )
      }
    )

    return win
}

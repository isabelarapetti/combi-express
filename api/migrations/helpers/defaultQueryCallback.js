const defaultQueryCallback = (err, res) => {
  if (err) {
    console.log('->', err.stack)
  } else {
    console.log('->', res)
  }
}

module.exports = {
  defaultQueryCallback
}

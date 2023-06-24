export const status = 'It works?'

export const calcHeightAndWidth = (width, height) => {
    const compressionRatio = Math.round(width / 250)
    const calculatedHeight = height / compressionRatio

    const rowSpan = Math.floor(calculatedHeight / 10)

    return rowSpan
}
require('dotenv').config()

const lettersLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function FindTheCode(digits, combinations_amount, combinations_type, code){
    const limit = combinations_amount ** digits
    let i = 0, index_map = [], newCode = ""

    while(newCode != code && i <= limit){
        newCode = ""
        for(let k = digits - 1; k >= 0; k--){
            if(index_map[k] <= ((combinations_type == 'text') ? 24 : 8)){
                index_map[k] += 1
                break
            }else{
                index_map[k] = 0
                continue
            }
        }
        for(let k = 0; k <= digits - 1; k++){
           newCode += (combinations_type == 'text') ? lettersLow[index_map[k]] : numbers[index_map[k]]
        }
        console.log('---------------------------------------------------\n')
        console.log('i', i)
        console.log('newCode', newCode)
        console.log('index_map', index_map)
        console.log('\n')

        i++
    }
    return `totalTries: ${i} || code ${code}`
}

const ValidateData = (d, p, c) => {
    if(isNaN(d)){
        return [false, "Digits provied should be a number"]
    }else if(p != 'a-z' && p != '0-9'){
        return [false, "Pattern should be either 'a-z' or '0-9'"]
    }else if((p == 'a-z' && !isNaN(c)) || (p == '0-9' && isNaN(c))){
        return [false, "Code provied should match with the pattern"]
    }else if(d != c.length){
        return [false, "Code provied should match with amount of digits"]
    }else{
        return true
    }
}

try{
    const env = process?.env
    const [digits, pattern, code] = [env?.DIGITS, env?.PATTERN, env?.CODE]

    if(env == null || digits == null || pattern == null || code == null){
        throw new Error('Env file or values missing...')
    }

    let afterValidate = ValidateData(digits, pattern, code)

    if(afterValidate[0] == false){
        throw new Error(afterValidate[1])
    }

    const combinations_amount = (pattern == 'a-z') ? 26 : (pattern == '0-9') ? 10 : 0
    const combinations_type = (combinations_amount == 26) ? 'text' : (pattern == 10) ? 'number' : 0

    if(env.DEVELOPMENT == 1){
        console.log({digits, pattern, code})
        console.log({combinations_amount, combinations_type})
    }

    if(process?.env?.DEVELOPMENT == 0){
        console.time('Time took');
        const result = FindTheCode(digits, combinations_amount, combinations_type, code)
        console.log('result', result)
        console.timeEnd('Time took');
    }
}catch(err){
    if(process?.env?.DEVELOPMENT == 1){
        console.error(err)
    }else{
        console.log('Something went wrong when running the program...')
    }
}
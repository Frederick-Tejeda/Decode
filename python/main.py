import time

lettersLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
maximun_per_column = {'a-z': 24, '0-9': 8}

def FindTheCode(digits, combinations_amount, combinations_type, code):
    limit = combinations_amount ** digits
    i, index_map, newCode = 0, [0] * digits, ""

    for a in range(0, digits):
            index_map[a] = 0
            print(index_map)

    while(newCode != code and i <= limit):
        newCode = ""
        k = digits - 1
        print(f"k: {k}, maximum: {maximun_per_column[combinations_type]}")
        b = digits - 1
        while(b >= 0):
            print(f"index_map {index_map}") 
            if(index_map[b] <= maximun_per_column[combinations_type]):
                index_map[b] += 1
                b -= 1
                break
            else:
                index_map[b] = 0
                b -= 1
                continue
        c = 0
        while(c <= digits - 1):
            if combinations_type == 'a-z':
                newCode += lettersLow[index_map[c]]
            else:
                newCode += numbers[index_map[c]]
            c += 1
        print('---------------------------------------------------\n')
        print(f"i, {i}")
        print(f"newCode, {newCode}")
        print(f"index_map, {index_map}")
        print('\n')

        i += 1
    return f"totalTries: {i} || code {code}"

def Validate(pattern, code):
    msg = []
    print(f"TYPE patter: {type(pattern)}")
    if pattern == "a-z":
        combinations_amount = 26
    elif pattern == "0-9":
        combinations_amount = 10
    else:
        return [[False, "Pattern is wrong..."], 0]
    
    if combinations_amount == 26 and isinstance(code, (str)):
        msg = [True, "Everything looks fine"]
    elif combinations_amount == 10 and isinstance(int(code), (int)):
        msg = [True, "Everything looks fine"]
    else:
        return [[False, "Pattern is wrong..."], 0]
    
    return [msg, combinations_amount]
    
pattern = input('Introduce "a-z" for a numerical code or "0-9" for a numerical one... ')
code = input('Introduce the code to decode... ')

validation = Validate(pattern, code)

if validation[0][0]:
    start_time = time.time()
    FindTheCode(len(code), validation[1], pattern, code)
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Tiempo de ejecución: {execution_time} segundos")
else:
    print(validation[0][1])
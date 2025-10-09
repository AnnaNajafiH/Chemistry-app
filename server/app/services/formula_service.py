import re
import json
import os


class FormulaService:

    def __init__(self):
        self.atomic_masses = self._load_atomic_masses()

        
    def _load_atomic_masses(self):
        possible_paths = [
            os.path.join(os.path.dirname(__file__), '..', 'data', 'atomic_masses.json'),  
            "./app/data/atomic_masses.json", 
            "./atomic_masses.json", 
            "atomic_masses.json"     
        ]

        for path in possible_paths:
            try:
                with open(path) as file:
                    print(f"Loaded atomic masses from {path}")
                    return json.load(file)
            except (FileNotFoundError, IOError):
                continue
        raise FileNotFoundError("Could not find atomic_masses.json in any expected location")



    def parse_formula(self, formula):
        try:
            tokens = re.findall(r'[A-Z][a-z]?|\d+|\(|\)', formula)
            if not tokens:
                raise ValueError(f"Invalid formula format: {formula}")
            
            stack = [[]]
            i = 0

            while i < len(tokens):
                token = tokens[i]
                i += 1  

                if token == '(':
                    stack.append([])
                elif token == ')':
                    if len(stack) <= 1:
                        raise ValueError(f"Unbalanced parentheses in formula: {formula}")
                        
                    group = stack.pop()
                    
                    if i < len(tokens) and tokens[i].isdigit():
                        multiplier = int(tokens[i])
                        i += 1
                    else:
                        multiplier = 1
                        
                    for elem, count in group:
                        stack[-1].append((elem, count * multiplier))
                elif re.match(r'[A-Z][a-z]?', token):
                    element = token
                    
                    if i < len(tokens) and tokens[i].isdigit():
                        count = int(tokens[i])
                        i += 1
                    else:
                        count = 1
                        
                    stack[-1].append((element, count))
                elif token.isdigit():
                    raise ValueError(f"Unexpected number in formula: {formula} at position {i-1}")
                else:
                    raise ValueError(f"Invalid token in formula: {token}")

            if len(stack) != 1:
                raise ValueError(f"Unbalanced parentheses in formula: {formula}")
                
            return stack[0]  
        except Exception as e:
            print(f"Error parsing formula '{formula}': {str(e)}")
            raise ValueError(f"Error parsing formula: {str(e)}")

    

    def calculate_molar_mass(self, formula):
        parsed = self.parse_formula(formula)
        total_mass = 0
        for element, count in parsed:
            if element not in self.atomic_masses:
                raise ValueError(f"Unknown element: {element}")
            total_mass += self.atomic_masses[element] * count
        return total_mass
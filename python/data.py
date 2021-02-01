import numpy as np
import pandas as pd
url = "https://jsonplaceholder.typicode.com/todos/1"
df = pd.read_json(url)


print(df)
#print(df.current["last_updated"])
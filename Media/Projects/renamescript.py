import os

def tree(dir, ext):
    paths = [f'{dir}/{p}' for p in os.listdir(dir)]
    files = []
    for p in paths:
        if os.path.isdir(p):
            files.extend(tree(p, ext))
        elif ext in p:
            files.append(p)
    
    return files

ext = "2mp4"
results = tree(os.getcwd(), ext)
for r in results:
    print(r)
    r2 = f'{".".join(r.split(".")[:-1])}.mp4'
    os.rename(r, r2)
    print(r2)



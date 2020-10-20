# generativeUnfoldings

Bibliography:

https://www.cancioneros.com/nd/2722/0/decimas-autobiografia-en-versos-chilenos-libro-violeta-parra


command for concatening all files

```bash
for f in data/decimas-one-file/*.txt; do cat $f >> all.txt; done
```

training with

https://github.com/ml5js/training-charRNN

they use older tensorflow, v1.15

i created a venv on Python2 using

```bash
python -m virtualenv env
```

activated it with

```bash
source env/bin/activate
```

and then installed the old tensorflow with

```bash
pip install tensorflow==1.15
```

# code by aaron montoya-moraga
# commissioned by nicole l'huillier
# for tsonami 2020, chile

# instructions: 
# cd to the folder tsonami
# run python script.py number
# number goes from 0.0 to 1.0
# 0.0 is replace no words, 1.0 is replace all words
# 0.05 is replace 5% of words

# import modules
import sys
import random
import unicodedata

# https://stackoverflow.com/questions/44431730/how-to-replace-accented-characters-in-python
def strip_accents(text):

    try:
        text = unicode(text, 'utf-8')
    except NameError: # unicode is a default on python 3 
        pass

    text = unicodedata.normalize('NFD', text)\
           .encode('ascii', 'ignore')\
           .decode("utf-8")

    return str(text)

# variable for probability of changing words
# default value is 5 percent
probability = 0.05

# if the command line has a number argument
# replace the probability value with it
if (len(sys.argv) == 2):
  probability = float(sys.argv[1])

# load original.txt
original = open("original.txt", "r").read()
original = strip_accents(original)

# load keywords.txt
keywords = open("keywords.txt", "r").read()
keywords = strip_accents(keywords)

# create array, where every element is a line
# keywords = keywords.split("\r\n");
keywords = keywords.split("\n");

# create variable for storing current word
currentWord = ""

# create variable for storing new text
newText = ""

# go through every character in the original text
for i in range(len(original)):
  
  # if the character is not a space
  if original[i] != " ":
    # append the character to the current word
    currentWord = currentWord + original[i]
  # if the character is a space
  else:
    # pick a random number between 0.0-1.0
    randomNumber = random.random()

    # if the number is smaller than probability
    # replace the currentWord with a random one from keywords
    if randomNumber < probability:
      currentWord = random.choice(keywords)

    # append the word to the new text variable
    newText = newText + currentWord + " "

    # reset the current word
    currentWord = ""

# open file output.txt to rewrite it
output = open("output.txt", "w+")

# write the next text on the output.txt file
output.write(newText)

# close file
output.close()

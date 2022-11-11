declare -a array=("")
# use for loop to read all values and indexes
for i in "${array[@]}"
do
   echo $i
   unzip $i -d ""
   rm -v $i
   # or do whatever with individual element of the array
done
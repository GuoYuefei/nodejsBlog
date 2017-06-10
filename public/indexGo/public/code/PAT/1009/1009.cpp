/*
 * 1009.cpp
 *
 *  Created on: 2017年5月2日
 *      Author: Administrator
 */

#include<iostream>
#include<cstdlib>
#include<string>

using namespace std;
/**
 * 哇哈哈，上一题是给这题做铺垫啊 其实可以用上一题的做法，但是这反正没限制，啦啦啦~啦
 */
int decompose(string str,string* words);
void reverse(string& str);
int main(){
	string* str = new string();
	getline(cin,*str);			//要接收空格的输入
	string* words = new string[str->length()/2+1];		//最长不会这么长
	reverse(*str);
//	cout << *str <<endl;
	int len=decompose(*str,words);
	for(int i=0;i<len;i++){
		reverse(words[i]);
	}
	for(int j=0;j<len-1;j++){
		cout << words[j] << " ";
	}
	cout << words[len-1].substr(0,words[len-1].length());			//为了输出没空格啊


}

//倒置函数
void reverse(string& str){
	string::iterator iter;
	string::reverse_iterator reiter;
	unsigned int i=0;
	for(iter=str.begin(),reiter=str.rbegin();i<str.length()/2;iter++,reiter++,i++){
		char temp;
		temp = *iter;
		*iter = *reiter;
		*reiter = temp;
	}
}

//分解函数
int decompose(string str,string* words){
	int j=-1;					//记录前一次的空格位置
	int i = str.find(' ');		//记录分解到哪个空格了
	int len=0;					//记录words当前长度，从1开始
	while(str.find(' ',j+1)!=string::npos){
		words[len] = str.substr(j+1,i-j-1);
		j=i;
		i=str.find(' ',j+1);
		len++;
	}
	words[len++] = str.substr(j+1,str.length()-j);
	return len;
}






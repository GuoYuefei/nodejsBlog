/**
*	第一次用vs写，感觉这个软件糟糕透了，但是要考试，没办法
*
**/
#include<iostream>
//用于操作
#define B 3
#define S 2
#define G 1
void toArray(int n,short* arr);
void change(short x,int oper);
using namespace std;
int main(){
	int n;short arr[3];
	cin >> n;
	toArray(n,arr);
	change(arr[0],B);
	change(arr[1],S);
	change(arr[2],G);
	system("pause");

}
//将一个三位以内的数字分解成3个数字分别存入一个3大小的数组，百十个分别存入0、1、2
void toArray(int n,short* arr){
	arr[0] = n/100;
	arr[1] = n/10%10;
	arr[2] = n%10;
}

void change(short x,int oper){
	switch (oper){
		case B:
			while(x--){
				cout << "B";
			}break;
		case S:
			while (x--){
				cout << "S";
			}break;
		case G:
			for (int i=1;i<x+1;i++){
				cout << i;
			}break;
	}

}
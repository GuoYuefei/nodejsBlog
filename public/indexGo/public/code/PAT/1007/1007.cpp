/*
 * 1007.cpp
 *
 *  Created on: 2017年5月1日
 *      Author: Administrator
 */
#include <iostream>
#include<cstdlib>
#include<cmath>
using namespace std;
int toArr(int x,int* arr);
int howmany(int* arr,int size);

int main(){
	int n;
	cin >> n;
	int* arr = new int[n/2+1];
	int size = toArr(n,arr);
	int result = howmany(arr,size);
	cout << result <<endl;


}

//将x以内的所有素数找出并按顺序放入arr数组,返回arr的长度
int toArr(int x,int* arr){
	int size = 0;
	for(int i=2;i<=x;i++){
		int flag = 1;
		//判断i是否为素数
		int sq = int(sqrt(i));
		for(int j=2;j<=sq;j++){
			if(i%j==0){
				flag = 0;
			}
		}
		if(flag==1){		//flag如果还是1，证明i是素数
			arr[size++] = i;
		}
	}
	return size;
}

int howmany(int* arr,int size){
	int num=0;
	for(int i=0;i<size-1;i++){
		if(arr[i+1]-arr[i]==2){
			num++;
		}
	}
	return num;
}


/*
 * 3NP1.C
 *
 *  Created on: 2017年4月14日
 *      Author: Administrator
 */
#include<iostream>
#include<cstdlib>

using namespace std;

//函数声明部分
int odevity(int n);
int Process(int n);

int main(){
	int n;
	while(true){
		cout << "请输入要切分的整数：";
		cin >> n;
		if(n<=0){
			break;
		}
		cout << "需要切分："<<Process(n)<<"次" << endl;
	}

	cout << "程序退出。。。"<<endl;
	return 0;
}


//奇偶判断函数，奇数就返回1，偶数返回0  输入那个数字
int odevity(int n){
	if(n%2==0){
		return 0;
	}else{
		return 1;
	}
}

//具体执行函数
int Process(int n){
	int i=0;  //用于计数作用，每/2就加一
	while(n != 1){
		if(odevity(n)){		//如果是奇数就执行下面语句
			n = 3*n+1;
		}
		//如果是奇数的话，经过上述的if后一定是偶数，所以都可以除2
		n = n/2;
		i++;
	}
	return i;
}


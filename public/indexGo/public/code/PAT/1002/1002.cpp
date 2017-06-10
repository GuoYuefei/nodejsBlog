#include<iostream>
#include<string>
#include<stdio.h>

using namespace std;

const string str[10] = {
	"ling","yi","er","san","si",
	"wu","liu","qi","ba","jiu"
};

void analyze(int n,int *flag){		//传入指针的引用
	for(int i=0;i<3;i++) flag[i] = 0;	//初始化将来作为下标的数组 
	// n在3位以下或者3位都满足
	flag[0] = n%10;		//最低位
	flag[1] = (n%100)/10;	//次高位
	flag[2] = n/100;	//最高位
	//cout << flag[0] << endl;
}

void output(int* flag){
	if(flag[2]==0){
		if(flag[1]==0){
			cout << str[flag[0]] << endl;
		}else{
			cout << str[flag[1]] << " " << str[flag[0]] << endl;
		}

	}else{
		cout << str[flag[2]] << " " << str[flag[1]] << " " << str[flag[0]] << endl; 

	}

}

int main(){
	int data[100] = {0};
	int result = 0;
	char temp='0';
	int i = 0;
	//只有有scanf格式化输入的时候，并且只有是%c的时候才响应回车输入，通过这种方法了解决如果把数字一位一位的存入数组的问题
	for(scanf("%c",&temp); temp != '\n';scanf("%c",&temp)){			//如果不是回车的话就转化成int 否则结束输入 
	//	cout << "temp:" << temp <<endl;
		data[i] = temp-'0';
	//	cout << "data["<<i<<"]:"<<data[i]<<endl;
		i++;
	}
	//将记录的值加起来
	while(--i>=0){
	//	cout << "data["<<i<<"]:"<<data[i]<<endl;
		result += data[i];
	}
	//cout << result << endl;
	int flag[3];
	analyze(result,flag);
	//cout << flag[2]<<flag[1]<<flag[0]<<endl;
	output(flag);
	return 0;
}





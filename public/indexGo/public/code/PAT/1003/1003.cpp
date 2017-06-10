/*
 * 1003.cpp
 *
 *  Created on: 2017年4月14日
 *      Author: Administrator
 */
#include<iostream>
#include<string>

using namespace std;
//声明
bool f1(string str);
int f2(string str);
bool f3(string str);



int main(){
//	string text;
	int n;		//记录将要输入字符串个数的int
	cin>>n;
	string *text = new string[n];

	for(int i =0;i<n;i++){
		cin >> text[i];
	}
	for(int i = 0;i<n;i++){
		if(f1(text[i])){
			int flag = f2(text[i]);
			if(flag==1){
				cout<<"YES"<<endl;
			}else if(flag==0){
				cout<<"NO"<<endl;
			}else if(flag==2){
				if(f3(text[i])){
					cout<<"YES"<<endl;
				}else{
					cout << "NO" << endl;
				}
	//			cout<<"这里应该还要加条件3的判断"<<endl;
			}
		}else{
			cout<<"NO"<<endl;
		}

	}







}


//检验条件一
bool f1(string str){
	string::iterator itstr;			//迭代器 其实是一个指向字符串内部的指针对象
	for(itstr=str.begin();itstr!=str.end();++itstr){
		if(!(*itstr == 'A' || *itstr == 'P' || *itstr == 'T')){
			return false;			//如果不满足条件1就return false
		}

	}
	return true;


}

/**
 * 检验条件二 aPATb a中‘A’的数量与b中的‘A’的数量相等，并且ab中只含有‘A’
 * 如果条件2不符合那么未必是不能通过的，需移交条件3判别后再次用条件2判别
 * 返回 0 错误，1正确，2虚移交条件3继续检测。。。。这里条件3的函数会条用该函数
 */
int f2(string str){
	const int i = str.find("PAT");		//i的值就是APT前面字符串的大小 找不到是
	const int j = str.length()-str.find("PAT")-3;	//j记录这pat后面字符的个数
	//这个需要移交条件3继续判别
	if(i!=j||i==-1) return 2; 		//如果不相等或者找不到“PAT”，就代表a与b中含有的字符数量不一样，不符合条件2
	/**
	 * 在执行下面判断之前先要排除输入的字符串是单单的“PAT"
	 * 原因是：下面的for循环条件判断有一个思维漏洞，所以用此句话补充
	 */
	if(i==0&&j==0) return 1;		//如果前面的字符和pat后面的字符都不存在，那么就是'PAT'了，返回true
	string::iterator itstr;
	string::reverse_iterator ritstr;		//注意反向迭代与正向逻辑相反，只需要把字符串尾指针当作0看就好
	for(itstr=str.begin();itstr<=str.begin()+i-1;++itstr){
		if(*itstr != 'A' ){			//如果aPATb a中出现了非‘A’的那么一定不符合我们删选的条件
			return 0;
		}
	}
	//aPATb 搜索b中是否含有不是'A'的字符
	for(ritstr=str.rbegin();ritstr<=str.rbegin()+j-1;++ritstr){
		if(*ritstr != 'A'){
			return 0;			//有不含A的就一定不成功
		}
	}
//	cout << i <<"  "<< j << endl;
	return 1;	//如果以上条件通过，则一定可以通过
}

//条件3之前的检验，看P..T是否存在两个及以上的A，因为一个A的情况f2已经检验
//并且还可以检验是否只存在一个P一个T
bool bf3(string str,int& i,int& j){
	i = str.find('P');		//第一个P的位子
	j = str.rfind('T');		//最后一个T的位子


	if(i+3>j){					//保证i<j的，并且PT之间至少有2个及以上的字符，不符合就不通过，如xxPASTXX就符合条件
//		cout << "xxxxxx"<<endl;
		return false;			//这个条件也保证了下面循环的合理性
	}

	//接下来应该用迭代器查询PaT的a字符串中是否只有A，如果只有A就进行条件三的检测
	string::iterator itstr;							//指向a的第一个字符
	//其实这可以用一个正则表示，可惜c++中我不会，哈哈
	for(itstr=str.begin()+i+1;itstr<=str.begin()+j-1;itstr++){
		if(*itstr != 'A') return false;			//a中只要有A以外的字符，那么就不符合情况
	}
	return true;							//符合上述条件就暂且通过，进入条件3的判定
}

/**
 * 检验条件三，首先要判断合理性 所以此前调用bf3
 */
bool f3(string str){
	int i,j;		//在执行bf3后ij就是PT的下标值
	string bstr;   //aPbTc 存放这个字符串的子字符串b
	if(!bf3(str,i,j)){
		return false;		//连bf3都不通过，那么就直接返回false
	}
	int a=i,b=j-i-1,c=str.length()-j-1;		//aPbTc int变量的abc分别代表abc字符串各有多少个A

//	//由于通过了bf3所以这里的子字符串一定是有'A'构成，数量j-i-1个
	bstr = str.substr(i+1,j-i-1);   //返回 fdsfdf 如果是2，4的话返回的字符串是sf即下标是2-5的，序号3-6的

	if(a==0&&c==0){				//只要子字符串ac是空的那么，b而且长度一定在2以上（程序到了这一步），那么就不符合条件
		return true;
	}

	//敢情这里还要一个b字符串判定是否只是有A构成
	string::iterator itstr;
	for(itstr=bstr.begin();itstr<bstr.end();itstr++){
		if(*itstr!='A') return false;
	}

	//到了这一步，字符串只有可能是AAAPAAAATAAAA,其中A的数量不确定
	while(b!=1){		//建立条件三的数学模型
		b-=1;
		c-=a;
	}
	//b等于1判定条件2   到这里我才发现f2、f3可以放在一起的，都使用这种方法简单  所以数学建模很重要啊
	if(c==a){
		return true;
	}else{
		return false;
	}


//	cout << "xxx" <<endl;

}









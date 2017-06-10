#ifndef SEQLIST_H_
#define SEQLIST_H_

#include<iostream>			//c++的io流
#include<cstdlib>			//这个头文件类似在c中的stdlib.h，其实在c++中可以使用所有c能使用的东西
#include"LinearList.h"

using namespace std;
const int defaultSize = 16;		//参照了java中的StringBuffer的默认大小，之后每次扩容为2*当前容量+1，貌似jdk源码中是这么做的，相比他们是经过研究的吧


template <class T>
class SeqList:public LinearList<T>{

private:
	T* data;
	int maxSize;			//最大的容纳表项数
	int last;			//指向当前已存的最后的表项,从零开始

protected:
	/**
	 * 私有函数，改变data的空间大小，主要用于类中使用
	 */
	virtual void reSize(int newSize);	//改变data数组空间大小
	/**
	 * 用于初始化对象使用，也就是我是专门用来给这个类的构造函数使用的
	 * 很可惜在c++中构造器不能调用其他构造，java中是行的。
	 * 所以通过函数把这部分可以重用的代码写在这里
	 * 主要是初始化一个maxSize，给data开辟空间，并且错误检查
	 */
	virtual void init(int size);
	/**
	 * 将a的值与b的值进行交换
	 */
	virtual void swap(T& a,T& b);


public:
	/**
	 * 构造器零：
	 * 默认构造，相当于SeqList（int）中，int取defaultSize
	 */
	SeqList();
	/**
	 * 构造器一：
	 * 这个构造器可以传入顺序表的大小，如果不传值系统就默认传默认值
	 */
	SeqList(int size);		//构造函数
	/**
	 * 构造器二：
	 * 这个构造器用于复制顺序表使用的
	 */
	SeqList(const SeqList<T>& L);					//用于复制的构造函数
	/**
	 * 析构器：
	 * 你懂的，不就是把数据删完，还了空间呗
	 */
	virtual ~SeqList();
	/**
	 * 返回表最大的容纳量（容量）
	 */
	int Size()const;
	/**
	 * 计算表的长度,从1开始计算
	 */
	int Length()const;
	/**
	 * 查找x，返回表项序号
	 */
	int search(T& x)const;
	int locate(int i) const;				//定位第i个，返回表项序号
	/**
	 * 取得第i个值，也就是下标为i-1的值
	 */
	T* getData(int i)const;
	void setData(int i,T& x);				////修改第i个元素的值
	bool insert(int i,T& x);		//在第i个元素之后插入一个x
	bool remove(int i,T& x); 		//删除第i个元素，并将值返回入x
	bool isEmpty() const;		//判断表是否为空
	bool isFull() const;		//判断表是否满
	void sort();			//排序
	void input();			//输入
	void output();			//输出
//	virtual SeqList<T> operator=(SeqList<T>& L);		//重载=进行赋值赋值
	int getLast(){
		return last;
	}





};


/*********************函数具体声明部分**************************/
/* **************这个部分是属于声明的**************/

/**
 * 用于初始化对象使用，也就是我是专门用来给这个类的构造函数使用的
 * 很可惜在c++中构造器不能调用其他构造，java中是行的。
 * 所以通过函数把这部分可以重用的代码写在这里
 * 主要是初始化一个maxSize，给data开辟空间，并且错误检查
 */
template<class T>
void SeqList<T>::init(int size){
	maxSize = size;
	data = new T[maxSize];		//创建t类型的数组
	if(data==NULL){				//异常检测机制，表示c++的异常机制方面做的好简单啊，相比于java
		cerr << "存储分配错误！"<<endl;
		exit(1);
	}
	//如果上一步异常，那么这个就不用进行咯，哈哈，也算一个改善把，因为下一个我要重用这个构造的代码
	last = -1;			//用-1表示当前实际长度为空
}

/**
 * 私有函数，改变data的空间大小，主要用在成员函数中
 */
template<class T>
void SeqList<T>::reSize(int newSize){
	if(newSize<=0){
		cerr<<"无效的顺序表大小"<<endl;return;
	}
	if(newSize != maxSize){
		T* newArray = new T[newSize];
		if(newArray == NULL){
			cerr << "内存分配失败" << endl;exit(1);
		}
		T* srcArray = this->data;
		T* destArray = newArray;
		int i = last+1;			//方便下面条件计算
		while(i--){				//复制顺序表，这里真的仅仅在复制动态数组
			*destArray++ = *srcArray++;	//++是在取内容然后赋值结束后指针++的，切记
		}
		delete[] data;
		data = newArray;
		maxSize = newSize;
	}
}

template<class T>
SeqList<T>::~SeqList(){
	delete[] data;		//把数据删除呗
}



template<class T>
SeqList<T>::SeqList(){
	init(defaultSize);
}


/**
 * size的默认大小为16，参照jdk源码
 */
template<class T>
SeqList<T>::SeqList(int size){
	init(size);
}

template<class T>
SeqList<T>::SeqList(const SeqList<T>& L){
	/*忽然想到了更好的代码
		maxSize = L.Size();
		last = L.Length() -1;
		data = new T(maxSize);
	*/

	init(L.maxSize);
	last = L.Length() - 1;	//因为在init中默认将last赋值-1的，在这个构造中是不正确的
	//开始复制顺序表的数据
	for(int i;i<=Length();i++){
		data[i-1] = *L.getData(i);		//getData中int是从1开始数的
	}
}



/**
 * 返回当前表最大的最大容量
 */
template<class T>
int SeqList<T>::Size()const{
	return maxSize;
}

/**
 * 表的长度，ok长度是从1开始的哦
 */
template<class T>
int SeqList<T>::Length()const{
	return last+1;
}

/**
 * 取得第i个值，也就是下标为i-1的值
 */
template<class T>
T* SeqList<T>::getData(int i)const{
	return (i>0&&i<=last+1?&data[i-1]:NULL);
}

/**
 * 修改第i个的值，也就是下标i-1
 * x代表要变化成为的值
 */
template<class T>
void SeqList<T>::setData(int i,T& x){
	if(i>0&&i<=last+1){
		data[i-1]=x;
	}
}

/**
 * i表示插在第i个元素之后
 * i取值在0到last+1之间
 */
template<class T>
bool SeqList<T>::insert(int i,T& x){
//	if(last == maxSize) return false;
	if(i<0||i>Length()) return false;		//先判断有木有i输入错误
	/**
	 * 如果没有输入错误就判断有木有满，满了就扩容，保证了后续代码能正常运行
	 */
	if(last == maxSize){
		reSize(2*maxSize+2);			//如果数组已经满了，那就在插入是扩容
	}
	for(int j=last;j>=i;j--){		//将数组中的元素往后移动，空出一个i的位子
		data[j+1] = data[j];
	}
	data[i] = x;			//添加数据
	last++;				//数组指针向后移动一位
	return true;
}

/**
 * 删除第i个数，这个i是正常逻辑上的数据不是cs的
 */
template<class T>
bool SeqList<T>::remove(int i,T& x){
	if(i==-1) return false;
	if(i == maxSize) return false;
	if(i<0||i>Length()) return false;
	x = data[i-1];
	for(int j=i;j<=last;j++){
		data[j-1] = data[j];
	}
	last--;
	return true;
}

/**
 * 判断表是否为空
 */
template<class T>
bool SeqList<T>::isEmpty()const{
	return (last==-1)?true:false;
}

/**
 * 判断表是否为满的状态
 */
template<class T>
bool SeqList<T>::isFull() const{
	return (last+1==maxSize)?true:false;
}

/**
 * 根据序号i定位在表中的位子
 * 这里的顺序表就是i
 * 如果超出范围就返回0
 */
template<class T>
int SeqList<T>::locate(int i) const{
	return (i>=1&&i<=last+1)?i:0;
}

template<class T>
int SeqList<T>::search(T& x)const{
	for(int i=0;i<=last;i++){
		if(data[i]==x) return i+1;
	}
	return 0;			//搜索失败
}

/**
 * swap交换函数，用于sort排序
 */
template<class T>
void SeqList<T>::swap(T& a,T& b){
	T temp;
	temp = a;
	a = b;
	b = temp;
}


/**从小到大的排序
 * 采用的是冒泡排序
 * 感觉这个思路简单方便
 */
template<class T>
void SeqList<T>::sort(){
	for(int j=last;j>=0;j--){
		for(int i=0;i<j;i++){
			if(data[i]>data[i+1]){
				swap(data[i],data[i+1]);
			}
		}
	}
}

template<class T>
void SeqList<T> :: input(){
	cout << "开始建立顺序表，请输入表中元素的个数：";
	while(true){
		cin >> last;
		last--;			//输入的是个数，所以索引要在此基础上减1
		if(last <= maxSize-1) break;
		cout << "表中元素个数不能超过：" << maxSize << endl;
	}
	for(int i=0;i<=last;i++){
		cout<<i+1<<endl;
		cin>>data[i];
	}
}



template<class T>
void SeqList<T>::output(){
	cout << "顺序表当前元素最后一个位置为：" << Length() << endl;
	for(int i=0;i<=last;i++){
		cout << "#" << i+1 <<":"<<data[i]<< endl;
	}
}

//template<class T>
//SeqList<T> SeqList<T> :: operator=(SeqList<T>& L){
//	SeqList<T> result(L);
//	return result;
//}



//#include"SeqList.cpp"

#endif

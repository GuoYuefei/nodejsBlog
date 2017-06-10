/*
 * List.h
 *	这个声明头文件是模板类的，所以声明和看起来像定义的都是放在.h中的
 *	所谓的看起来像定义的部分其实只是声明而已
 *  Created on: 2017年3月16日
 *      Author: Administrator
 */

#ifndef LINEAR_LIST_LIST_H_
#define LINEAR_LIST_LIST_H_


#include<cstdlib>
using namespace std;
//数据节点
template <class T>
struct LinkNode{
	T data;			//数据域
	LinkNode<T> *link;		//后向指针域
	//仅只初始化指针域的构造函数
	LinkNode(LinkNode<T> *ptr=NULL){
		link = ptr;
	}
	//初始化数据域和指针域的构造函数
	LinkNode(const T& item,LinkNode<T> *ptr = NULL){
		data = item;
		link = ptr;
	}
};


/**
 * 使用了附加头节点，虽然增加了一点点的空间使用量，但是可以统一一些算法
 * 比如插入和删除的算法可以统一起来了
 */
template<class T>
class List:public LinearList<T>{
protected:
	LinkNode<T> *first;			//头节点的指针，也是list数据的入口
public:
	/**
	 * 初始化列表，默认List的构造器
	 */
	List():first(new LinkNode<T>()){}

	/**
	 * 传值构造器，可以设置附加头节点的值
	 * 这个值可以作为一个标记或者存储表长==
	 */
	List(const T& t):first(new LinkNode<T>(t)){}

	/**
	 * 拷贝构造器
	 */
	List(const List<T>& L);


	virtual ~List(){
		mkEmpty();
	}

	void mkEmpty();			//置空列表
	int Length() const;
	/**
	 * 得到头节点
	 */
	LinkNode<T>* getHead() const{
		return first;
	}
	/**
	 * 设置头指针
	 */
	void setHead(LinkNode<T>* p){
		first = p;
	}

	LinkNode<T>* search(T& x) const;
	LinkNode<T>* locate(int i) const;
	T* getDate(int i) const;		//得到第i个数据
	void setDate(int i,T& x);		//改变第i个数据
	bool insert(int i,T& x);		//在第i个数据后面插入一个数据域是x的节点
	bool remove(int i,T& x);		//删除第i个数据，并且将删除的数据放入x中
	bool isEmpty()const{
		return first->link==NULL?true:false;
	}
	bool isFull()const{
		return false;
	}
	void sort();					//排序
	void input();					//控制窗口输入
	void output();					//控制窗口输出


};


/**
 * by wing
 * 部分复杂模板函数的声明部分
 */

/**
 * 复制构造，我去c++好烦这一点
 */
template<class T>
List<T>::List(const List<T>& L){
	T value;
	//注意我们传值传进来的是const的引用，所以只能使用L的const的函数
	LinkNode<T>* srcptr = L.getHead();			//被复制链表的头节点地址
	LinkNode<T>* destptr = first = new LinkNode<T>;
	while(srcptr != NULL){						//逐个节点赋值
		value = srcptr->link->data;
		destptr->link = new LinkNode<T>(value);
		destptr = destptr->link;
		srcptr = srcptr->link;
	}
	destptr->link = NULL;
}

/**
 * 置空表
 * 这里使用的是从头开始清除，不包括头节点
 *
 */
template<class T>
void List<T>::mkEmpty(){
	LinkNode<T>* q;
	//这个while循环我比较喜欢
	while(first->link!=NULL){
		q = first->link;
		first->link = q->link;	//first指向了原本第二个节点的右节点，也就是把第二节点断开了
		delete q;				//归还内存
	}
}

/**
 * 长度计数从头节点算，但是从0开始的
 * 所以返回的是有效数据的长度，如first 2 3，我们返回的是2.   2 3是有效数据节点
 */
template<class T>
int List<T>::Length()const{
	LinkNode<T>* p = first->link;
	int count = 0;
	while(p!=NULL){		//只要有有效数据节点就计数一次
		p=p->link;
		count++;
	}
	return count;
}





#endif /* LINEAR_LIST_LIST_H_ */

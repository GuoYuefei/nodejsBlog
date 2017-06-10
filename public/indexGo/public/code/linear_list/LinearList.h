
//所有的线性表都要实现这个接口（抽象类）

#ifndef LINEARLIST_H_
#define LINEARLIST_H_

//enum boolean{"flase","ture"};
/**
 *这是一个线性表的接口类的定义
 *
 *
 */
template<class T>
class LinearList{
public:
	LinearList(){				//构造函数
	}
	virtual ~LinearList(){		//构析函数

	}
	virtual int Size() const = 0;	//求表的最大体积
	virtual int Length() const = 0;  //求表的长度
	virtual int search(T& x) const = 0;		//在表中搜索给定值 x
	virtual int locate(int i) const = 0;  		//在表中定位第i个元素位置
	virtual T* getData(int i) const = 0;		//获取第i个元素的位置
	virtual void setData(int i,T& x) = 0;		//修改第i个元素的值
	virtual bool insert(int i,T& x) = 0;		//在第i个元素之后插入一个x
	virtual bool remove(int i,T& x)	= 0; 		//删除第i个元素，并将值返回入x
	virtual bool isEmpty() const = 0;		//判断表是否为空
	virtual bool isFull() const = 0;		//判断表是否满
	virtual void sort() = 0;			//排序
	virtual void input() = 0;			//输入
	virtual void output() = 0;			//输出
//	virtual LinearList<T>& operator=(LinearList<T>& L) = 0;		//重载=进行赋值赋值


};

#endif

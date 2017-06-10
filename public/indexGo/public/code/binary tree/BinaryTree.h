/*
 * BinaryTree.h
 *
 *  Created on: 2017年5月14日
 *      Author: Administrator
 *
 * 这个文件的三个类关系是耦合
 */

#ifndef BINARY_TREE_BINARYTREE_H_
#define BINARY_TREE_BINARYTREE_H_

#include<cstdlib>
#include<iostream>
//二叉树，我不在使用模板了，那么就以int为例吧
namespace std {

/*//抽象类作为抽象基类，做java中的接口使用，据说接口越简单越好哦
class PrintNode{
public:
	PrintNode();			//构造函函数
	virtual ~PrintNode();		//构析函数

	*
	 * 这是作为一个接口类
	 * 用户可以通过继承这个类来使用不同的print函数

	virtual void print(const Node* node) const=0;
};

//这个可以写在场景中
class ConsolePrint:public PrintNode{

};*/

//begin 树结点类，可作为基类重写printData，多态
class Node{
public:
	int data;
	Node* left;
	Node* right;
	Node():data(0),left(NULL),right(NULL){};
	Node(int d):data(d),left(NULL),right(NULL){};
	virtual ~Node(){
	}
	/**
	 *这个虚函数用于打印数据，也让子类重写函数进行不同的输出
	 *使用多态调用不同的打印函数
	 *灵活了，我的哥
	 *虚函数要有定义也就是不能少了{}，不然会错
	 */
	virtual void printData(){
		cout << this->data << " ";
	};
};
//end

class BinaryTree {
private:
	Node* root;			//私有根节点
//	int length;			//长度
//	int deep;			//深度
//	Node* Next=root->left;					//下次追加元素的位置
	//用于后续遍历
	class Infom{
	public:
		bool flag;			//记录该节点有木有遍历过右子节点
		Node* p;
		Infom(Node* nd):flag(false),p(nd){
		}
		virtual ~Infom(){}
	};
	void preorder(Node* p){
		if(p==NULL){
			return;
		}
		p->printData();
		preorder(p->left);
		preorder(p->right);
	}
	void inorder(Node* p){
		if(p==NULL){
			return;
		}
		inorder(p->left);
		p->printData();
		inorder(p->right);
	}
	void subsequent(Node* p){
		if(p==NULL){
			return;
		}
		subsequent(p->left);
		subsequent(p->right);
		p->printData();
	}



public:
	BinaryTree(int root_data):root(new Node(root_data)){};					//指定头节点构造
	BinaryTree(Node* node):root(node){};
	BinaryTree():root(new Node(0)){};							//默认
//	BinaryTree(const BinaryTree* BT);		//拷贝构造
	virtual ~BinaryTree();

	void appendNode(Node* nd);				//追加结点
	void appendInts(const int* ds,const int length);				//输入一个数据数组追加入二叉树


	/**
	 * 数的遍历，很重要哦
	 */
	void preorder_traversal();				//前序遍历
	void inorder_traversal();				//中序遍历
	void subsequent_traversal();			//后续遍历
	void level_traversal();					//层次遍历

	void preorder_stack();					//前序遍历，非递归实现
	void inorder_stack();					//中序遍历，使用堆栈实现
	void subsequent_stack();				//后续遍历，非递归实现





};

} /* namespace std */

#endif /* BINARY_TREE_BINARYTREE_H_ */

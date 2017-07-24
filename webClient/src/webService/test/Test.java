package webService.test;

public class Test {

	public static void main(String[] args) {

		Function fu;
		try{
			fu=new FunctionServiceLocator().getFunctionPort();
			String str=fu.transWords("123");
			System.out.println(str);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}

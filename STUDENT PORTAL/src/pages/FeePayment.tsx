
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { BadgeIndianRupee, CreditCard, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FeeDetails {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface UserInfo {
  userType: "student" | "faculty" | "guest";
  username: string;
}

const FeePayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userType: "guest",
    username: "Guest"
  });
  
  const [feeDetails, setFeeDetails] = useState<FeeDetails[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('portalUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUserInfo({
      userType: parsedUser.userType,
      username: parsedUser.username
    });

    // Only load demo data for demo accounts
    const isDemoAccount = parsedUser.username === "Rahul Sharma" || parsedUser.username === "Prof. Ananya Patel";
    
    if (isDemoAccount) {
      // Only set default fee data for demo accounts
      setFeeDetails([
        {
          id: "fee-1",
          name: "Tuition Fee - Semester 5",
          amount: 45000,
          dueDate: "2025-05-30",
          status: "pending"
        },
        {
          id: "fee-2",
          name: "Library Fee",
          amount: 2500,
          dueDate: "2025-05-25",
          status: "pending"
        },
        {
          id: "fee-3",
          name: "Examination Fee",
          amount: 3500,
          dueDate: "2025-06-10",
          status: "pending"
        },
        {
          id: "fee-4",
          name: "Hostel Fee - Quarter 2",
          amount: 25000,
          dueDate: "2025-05-15",
          status: "overdue"
        },
        {
          id: "fee-5",
          name: "Tuition Fee - Semester 4",
          amount: 45000,
          dueDate: "2025-01-15",
          status: "paid"
        },
      ]);
    } else {
      // For real users, load their data from localStorage or start with empty array
      const storedFees = localStorage.getItem(`fees_${parsedUser.username}`);
      if (storedFees) {
        setFeeDetails(JSON.parse(storedFees));
      } else {
        // Start with an empty fees array for new users
        setFeeDetails([]);
      }
    }
  }, [navigate]);
  
  // Calculate total pending fees
  const totalPendingFees = feeDetails
    .filter(fee => fee.status === "pending" || fee.status === "overdue")
    .reduce((total, fee) => total + fee.amount, 0);
  
  const handlePayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Get the selected fee IDs
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      const selectedFeeIds: string[] = [];
      
      checkboxes.forEach((checkbox) => {
        selectedFeeIds.push((checkbox as HTMLInputElement).value);
      });
      
      // Update the fee status to "paid" for selected fees
      const updatedFees = feeDetails.map(fee => {
        if (selectedFeeIds.includes(fee.id)) {
          return { ...fee, status: "paid" as const };
        }
        return fee;
      });
      
      setFeeDetails(updatedFees);
      
      // Save to localStorage for real users
      if (userInfo.username !== "Rahul Sharma" && userInfo.username !== "Prof. Ananya Patel") {
        localStorage.setItem(`fees_${userInfo.username}`, JSON.stringify(updatedFees));
      }
      
      setProcessingPayment(false);
      
      toast({
        title: "Payment Successful",
        description: "Your fee payment has been processed successfully.",
      });
    }, 2000);
  };
  
  if (userInfo.userType === "faculty") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground">
            Faculty members don't have fee payments. This page is for students only.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fee Payment</h1>
        <p className="text-muted-foreground">
          View and pay your pending fees
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5 text-education-600" />
              Fee Overview
            </CardTitle>
            <CardDescription>Summary of your fee payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {totalPendingFees.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {feeDetails.filter(fee => fee.status === "pending").length} items
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {feeDetails.filter(fee => fee.status === "overdue").length} items
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  {feeDetails.filter(fee => fee.status === "paid").length} items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Choose your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="card" className="space-y-4" onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center cursor-pointer">
                  <BadgeIndianRupee className="h-5 w-5 mr-2" />
                  UPI Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <Label htmlFor="netbanking" className="cursor-pointer">
                  Net Banking
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Fee Payments</CardTitle>
              <CardDescription>Select the fees you want to pay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feeDetails.filter(fee => fee.status !== "paid").length > 0 ? (
                feeDetails
                  .filter(fee => fee.status !== "paid")
                  .map(fee => (
                    <div key={fee.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-4">
                        <input 
                          type="checkbox" 
                          id={fee.id} 
                          value={fee.id}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <div>
                          <Label htmlFor={fee.id} className="font-medium cursor-pointer">{fee.name}</Label>
                          <p className="text-sm text-muted-foreground">Due: {new Date(fee.dueDate).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full mr-4 ${
                          fee.status === "overdue" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}>
                          {fee.status === "overdue" ? "Overdue" : "Due Soon"}
                        </span>
                        <p className="font-semibold flex items-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {fee.amount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-10">
                  <BadgeIndianRupee className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Pending Fees</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You don't have any pending fee payments at the moment
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {paymentMethod === "card" && (
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="Enter name on card" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={processingPayment}
                    onClick={handlePayment}
                  >
                    {processingPayment ? "Processing..." : "Pay Fees"}
                  </Button>
                </div>
              )}
              
              {paymentMethod === "upi" && (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@upi" />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={processingPayment}
                    onClick={handlePayment}
                  >
                    {processingPayment ? "Processing..." : "Pay Fees"}
                  </Button>
                </div>
              )}
              
              {paymentMethod === "netbanking" && (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Select Bank</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="pnb">Punjab National Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={processingPayment}
                    onClick={handlePayment}
                  >
                    {processingPayment ? "Processing..." : "Pay Fees"}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your previous fee payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feeDetails.filter(fee => fee.status === "paid").length > 0 ? (
                feeDetails
                  .filter(fee => fee.status === "paid")
                  .map(fee => (
                    <div key={fee.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">{fee.name}</p>
                        <p className="text-sm text-muted-foreground">Paid on: {new Date().toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium px-2 py-1 rounded-full mr-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Paid
                        </span>
                        <p className="font-semibold flex items-center">
                          <IndianRupee className="h-3 w-3 mr-1" />
                          {fee.amount.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-10">
                  <BadgeIndianRupee className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Payment History</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't made any fee payments yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeePayment;

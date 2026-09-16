export default function CouponCard({ code, itemName, discount, expiry }) {
  return (
    <div className="border-2 border-dashed border-saffron rounded-xl p-4 bg-amber-50">
      <div className="text-xs text-gray-500 mb-1">Lucky Coupon</div>
      <div className="text-xl font-bold text-indigo-deep tracking-wider">{code}</div>
      <div className="text-sm mt-2 text-gray-700">{itemName}</div>
      <div className="text-sm font-semibold text-success mt-1">{discount} off</div>
      <div className="text-xs text-gray-400 mt-2">Valid till {expiry}</div>
    </div>
  );
}
